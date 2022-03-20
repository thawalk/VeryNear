use crate::*;

#[near_bindgen]
impl Contract {
    #[payable]
    pub fn nft_mint(
        &mut self,
        receiver_id: AccountId,
        //we add an optional parameter for perpetual royalties
        //perpetual_royalties: Option<HashMap<AccountId, u32>>,
    ) {
        //measure the initial storage being used on the contract
        let initial_storage_usage = env::storage_usage();

        // create a royalty map to store in the token
        //let mut royalty = HashMap::new();
        let royalty = HashMap::new();

        // if perpetual royalties were passed into the function:
        /*
        if let Some(perpetual_royalties) = perpetual_royalties {
            //make sure that the length of the perpetual royalties is below 7 since we won't have enough GAS to pay out that many people
            assert!(
                perpetual_royalties.len() < 7,
                "Cannot add more than 6 perpetual royalty amounts"
            );

            //iterate through the perpetual royalties and insert the account and amount in the royalty map
            for (account, amount) in perpetual_royalties {
                royalty.insert(account, amount);
            }
        }
        */

        // current_token_id starts with 0
        assert!(
            (self.current_token_id as u128) < self.nft_total_supply().into(),
            "No more NFTs can be minted"
        );
        assert!(
            self.token_metadata_by_id
                .get(&self.current_token_id.to_string())
                .is_some(),
            "Metadata is not initialised"
        );

        //specify the token struct that contains the owner ID
        let token = Token {
            //set the owner ID equal to the receiver ID passed into the function
            owner_id: receiver_id,
            //we set the approved account IDs to the default value (an empty map)
            approved_account_ids: Default::default(),
            //the next approval ID is set to 0
            next_approval_id: 0,
            //the map of perpetual royalties for the token (The owner will get 100% - total perpetual royalties)
            royalty,
        };

        //insert the token ID and token struct and make sure that the token doesn't exist
        assert!(
            self.tokens_by_id
                .insert(&self.current_token_id.to_string(), &token)
                .is_none(),
            "Token already exists"
        );

        //insert the token ID and metadata
        //self.token_metadata_by_id.insert(&token_id, &metadata);

        //call the internal method for adding the token to the owner
        self.internal_add_token_to_owner(&token.owner_id, &self.current_token_id.to_string());

        // Construct the mint log as per the events standard.
        let nft_mint_log: EventLog = EventLog {
            // Standard name ("nep171").
            standard: NFT_STANDARD_NAME.to_string(),
            // Version of the standard ("nft-1.0.0").
            version: NFT_METADATA_SPEC.to_string(),
            // The data related with the event stored in a vector.
            event: EventLogVariant::NftMint(vec![NftMintLog {
                // Owner of the token.
                owner_id: token.owner_id.to_string(),
                // Vector of token IDs that were minted.
                token_ids: vec![self.current_token_id.to_string()],
                // An optional memo to include.
                memo: None,
            }]),
        };

        // Log the serialized json.
        env::log_str(&nft_mint_log.to_string());
        env::log_str(&self.mint_price.to_string());

        //calculate the required storage which was the used - initial
        let required_storage_in_bytes = env::storage_usage() - initial_storage_usage;

        //refund any excess storage if the user attached too much. Panic if they didn't attach enough to cover the required.
        refund_deposit_mint(required_storage_in_bytes, &self.mint_price);

        self.current_token_id = &self.current_token_id + 1;

        //env::log_str(&self.current_token_id.to_string());
    }
}

#[cfg(all(test, not(target_arch = "wasm32")))]
mod tests {
    use crate::nft_core::NonFungibleTokenCore;
    use near_sdk::test_utils::{accounts, VMContextBuilder};
    use near_sdk::testing_env;

    use super::*;
    use std::collections::HashMap;
    const INSUFFICIENT_MINT_STORAGE_COST: u128 = 5870000000000000000000;
    const MINT_STORAGE_COST: u128 = 1005000000000000000000000;

    fn get_context(predecessor_account_id: AccountId) -> VMContextBuilder {
        let mut builder = VMContextBuilder::new();
        builder
            .current_account_id(accounts(0))
            .signer_account_id(predecessor_account_id.clone())
            .predecessor_account_id(predecessor_account_id);
        builder
    }

    fn sample_token_metadata() -> TokenMetadata {
        TokenMetadata {
            title: Some("Olympus Mons".into()),
            description: Some("The tallest mountain in the charted solar system".into()),
            media: None,
            media_hash: None,
            copies: Some(1u64),
            issued_at: None,
            expires_at: None,
            starts_at: None,
            updated_at: None,
            extra: None,
            reference: None,
            reference_hash: None,
        }
    }

    #[test]
    #[should_panic(expected = "No more NFTs can be minted")]
    fn test_default() {
        let mut context = get_context(accounts(0));
        testing_env!(context.build());
        let mut contract = Contract::new_default_meta(accounts(0).into());

        testing_env!(context
            .storage_usage(env::storage_usage())
            .attached_deposit(MINT_STORAGE_COST)
            .predecessor_account_id(accounts(1))
            .build());

        contract.nft_mint(accounts(1));
    }

    #[test]
    #[should_panic(
        expected = "Must attach 1003750000000000000000000 yoctoNEAR to cover storage and minting cost"
    )]
    fn test_mint_error() {
        let mut context = get_context(accounts(0));
        testing_env!(context.build());
        let mut contract = Contract::new_default_meta(accounts(0).into());

        let token_id = "0".to_string();
        let metadata_result =
            contract.set_token_metadata(token_id.clone(), sample_token_metadata());
        assert_eq!(metadata_result, true);

        testing_env!(context
            .storage_usage(env::storage_usage())
            .attached_deposit(INSUFFICIENT_MINT_STORAGE_COST)
            .predecessor_account_id(accounts(1))
            .build());

        contract.nft_mint(accounts(1));
        assert_eq!(contract.nft_tokens(None, None).len(), 1);

        if let Some(token) = contract.nft_token(token_id.clone()) {
            assert_eq!(token.token_id, token_id);
            assert_eq!(token.owner_id, accounts(1));
            assert_eq!(token.metadata, sample_token_metadata());
            assert_eq!(token.approved_account_ids, HashMap::new());
            assert_eq!(token.royalty, HashMap::new());
        } else {
            panic!("token not correctly created, or not found by nft_token");
        }
    }

    #[test]
    fn test_mint() {
        let mut context = get_context(accounts(0));
        testing_env!(context.build());
        let mut contract = Contract::new_default_meta(accounts(0).into());

        let token_id = "0".to_string();
        let metadata_result =
            contract.set_token_metadata(token_id.clone(), sample_token_metadata());
        assert_eq!(metadata_result, true);

        testing_env!(context
            .storage_usage(env::storage_usage())
            .attached_deposit(MINT_STORAGE_COST)
            .predecessor_account_id(accounts(1))
            .build());

        contract.nft_mint(accounts(1));
        assert_eq!(contract.nft_tokens(None, None).len(), 1);

        if let Some(token) = contract.nft_token(token_id.clone()) {
            assert_eq!(token.token_id, token_id);
            assert_eq!(token.owner_id, accounts(1));
            assert_eq!(token.metadata, sample_token_metadata());
            assert_eq!(token.approved_account_ids, HashMap::new());
            assert_eq!(token.royalty, HashMap::new());
        } else {
            panic!("token not correctly created, or not found by nft_token");
        }
    }
}
