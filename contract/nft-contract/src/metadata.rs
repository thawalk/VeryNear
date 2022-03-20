use crate::*;
pub type TokenId = String;
//defines the payout type we'll be returning as a part of the royalty standards.
#[derive(Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Payout {
    pub payout: HashMap<AccountId, U128>,
}

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct NFTContractMetadata {
    pub spec: String,              // required, essentially a version like "nft-1.0.0"
    pub name: String,              // required, ex. "Mosaics"
    pub symbol: String,            // required, ex. "MOSIAC"
    pub icon: Option<String>,      // Data URL
    pub base_uri: Option<String>, // Centralized gateway known to have reliable access to decentralized storage assets referenced by `reference` or `media` URLs
    pub reference: Option<String>, // URL to a JSON file with more info
    pub reference_hash: Option<Base64VecU8>, // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
}

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Debug, PartialEq)]
#[serde(crate = "near_sdk::serde")]
pub struct TokenMetadata {
    pub title: Option<String>, // ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"
    pub description: Option<String>, // free-form description
    pub media: Option<String>, // URL to associated media, preferably to decentralized, content-addressed storage
    pub media_hash: Option<Base64VecU8>, // Base64-encoded sha256 hash of content referenced by the `media` field. Required if `media` is included.
    pub copies: Option<u64>, // number of copies of this set of metadata in existence when token was minted.
    pub issued_at: Option<u64>, // When token was issued or minted, Unix epoch in milliseconds
    pub expires_at: Option<u64>, // When token expires, Unix epoch in milliseconds
    pub starts_at: Option<u64>, // When token starts being valid, Unix epoch in milliseconds
    pub updated_at: Option<u64>, // When token was last updated, Unix epoch in milliseconds
    pub extra: Option<String>, // anything extra the NFT wants to store on-chain. Can be stringified JSON.
    pub reference: Option<String>, // URL to an off-chain JSON file with more info.
    pub reference_hash: Option<Base64VecU8>, // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Token {
    //owner of the token
    pub owner_id: AccountId,
    //list of approved account IDs that have access to transfer the token. This maps an account ID to an approval ID
    pub approved_account_ids: HashMap<AccountId, u64>,
    //the next approval ID to give out.
    pub next_approval_id: u64,
    //keep track of the royalty percentages for the token in a hash map
    pub royalty: HashMap<AccountId, u32>,
}

//The Json token is what will be returned from view calls.
#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[serde(crate = "near_sdk::serde")]
pub struct JsonToken {
    //token ID
    pub token_id: TokenId,
    //owner of the token
    pub owner_id: AccountId,
    //token metadata
    pub metadata: TokenMetadata,
    //list of approved account IDs that have access to transfer the token. This maps an account ID to an approval ID
    pub approved_account_ids: HashMap<AccountId, u64>,
    //keep track of the royalty percentages for the token in a hash map
    pub royalty: HashMap<AccountId, u32>,
}

pub trait NonFungibleTokenMetadata {
    //view call for returning the contract metadata
    fn nft_metadata(&self) -> NFTContractMetadata;
}

#[near_bindgen]
impl NonFungibleTokenMetadata for Contract {
    fn nft_metadata(&self) -> NFTContractMetadata {
        self.metadata.get().unwrap()
    }
}

#[near_bindgen]
impl Contract {
    #[payable]
    pub fn set_token_metadata(&mut self, token_id: TokenId, metadata: TokenMetadata) -> bool {
        assert_eq!(
            env::predecessor_account_id(),
            self.owner_id,
            "Unauthorized user to set token metadata"
        );
        assert!(
            self.token_metadata_by_id
                .insert(&token_id, &metadata)
                .is_none(),
            "Cannot add metadata to existing token id"
        );

        return true;
    }

    #[payable]
    pub fn update_token_metadata(&mut self, token_id: TokenId, metadata: TokenMetadata) -> bool {
        assert_eq!(
            env::predecessor_account_id(),
            self.owner_id,
            "Unauthorized user to update token metadata"
        );
        assert!(
            self.token_metadata_by_id
                .insert(&token_id, &metadata)
                .is_some(),
            "Add metadata to token id first"
        );

        return true;
    }

    pub fn nft_token_metadata(&self, token_id: TokenId) -> Option<TokenMetadata> {
        if let Some(metadata) = self.token_metadata_by_id.get(&token_id) {
            //we return the JsonToken (wrapped by Some since we return an option)
            Some(metadata)
        } else {
            //if there wasn't a token ID in the tokens_by_id collection, we return None
            None
        }
    }
}

#[cfg(all(test, not(target_arch = "wasm32")))]
mod tests {
    use crate::nft_core::NonFungibleTokenCore;
    use near_sdk::test_utils::{accounts, VMContextBuilder};
    use near_sdk::testing_env;

    use super::*;

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

    fn sample_token_metadata_2() -> TokenMetadata {
        TokenMetadata {
            title: Some("Mount Everest".into()),
            description: Some("The tallest mountain in earth".into()),
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
    fn test_new() {
        let mut context = get_context(accounts(0));
        testing_env!(context.build());
        let contract = Contract::new_default_meta(accounts(0).into());
        testing_env!(context.is_view(true).build());
        assert_eq!(contract.nft_token("1".to_string()), None);
    }

    #[test]
    #[should_panic(expected = "The contract is not initialized")]
    fn test_default() {
        let context = get_context(accounts(0));
        testing_env!(context.build());
        let _contract = Contract::default();
    }

    #[test]
    fn test_empty_nft_token_metadata() {
        let mut context = get_context(accounts(0));
        testing_env!(context.build());
        let contract = Contract::new_default_meta(accounts(0).into());

        testing_env!(context
            .storage_usage(env::storage_usage())
            .account_balance(env::account_balance())
            .is_view(true)
            .attached_deposit(0)
            .build());

        let token_id = "0".to_string();
        assert_eq!(contract.nft_token_metadata(token_id.clone()), None)
    }

    #[test]
    fn test_set_token_metadata() {
        let mut context = get_context(accounts(0));
        testing_env!(context.build());
        let mut contract = Contract::new_default_meta(accounts(0).into());
        let token_id = "0".to_string();
        let metadata_result =
            contract.set_token_metadata(token_id.clone(), sample_token_metadata());
        assert_eq!(metadata_result, true);

        testing_env!(context
            .storage_usage(env::storage_usage())
            .account_balance(env::account_balance())
            .is_view(true)
            .attached_deposit(0)
            .build());

        if let Some(metadata) = contract.nft_token_metadata(token_id.clone()) {
            assert_eq!(metadata, sample_token_metadata());
        } else {
            panic!("token metadata not correctly created, or not found by nft_token_metadata");
        }
    }

    #[test]
    #[should_panic(expected = "Unauthorized user to set token metadata")]
    fn test_set_token_metadata_others() {
        let mut context = get_context(accounts(0));
        testing_env!(context.build());
        let mut contract = Contract::new_default_meta(accounts(0).into());
        testing_env!(context
            .storage_usage(env::storage_usage())
            .attached_deposit(1)
            .predecessor_account_id(accounts(1))
            .build());
        let token_id = "0".to_string();
        contract.set_token_metadata(token_id.clone(), sample_token_metadata());
    }

    #[test]
    fn test_update_token_metadata() {
        let mut context = get_context(accounts(0));
        testing_env!(context.build());
        let mut contract = Contract::new_default_meta(accounts(0).into());
        let token_id = "0".to_string();
        let metadata_result =
            contract.set_token_metadata(token_id.clone(), sample_token_metadata());
        assert_eq!(metadata_result, true);

        testing_env!(context
            .storage_usage(env::storage_usage())
            .account_balance(env::account_balance())
            .is_view(true)
            .attached_deposit(0)
            .build());

        if let Some(metadata) = contract.nft_token_metadata(token_id.clone()) {
            assert_eq!(metadata, sample_token_metadata());
        } else {
            panic!("token metadata not correctly created, or not found by nft_token_metadata");
        }

        testing_env!(context
            .storage_usage(env::storage_usage())
            .attached_deposit(1)
            .predecessor_account_id(accounts(0))
            .is_view(false)
            .build());

        let update_metadata_result =
            contract.update_token_metadata(token_id.clone(), sample_token_metadata_2());
        assert_eq!(update_metadata_result, true);

        testing_env!(context
            .storage_usage(env::storage_usage())
            .account_balance(env::account_balance())
            .is_view(true)
            .attached_deposit(0)
            .build());

        if let Some(metadata) = contract.nft_token_metadata(token_id.clone()) {
            assert_eq!(metadata, sample_token_metadata_2());
        } else {
            panic!("token metadata not correctly updated, or not found by nft_token_metadata");
        }
    }

    #[test]
    #[should_panic(expected = "Add metadata to token id first")]
    fn test_update_token_metadata_error() {
        let mut context = get_context(accounts(0));
        testing_env!(context.build());
        let mut contract = Contract::new_default_meta(accounts(0).into());
        testing_env!(context
            .storage_usage(env::storage_usage())
            .attached_deposit(1)
            .predecessor_account_id(accounts(0))
            .build());
        let token_id = "0".to_string();
        contract.update_token_metadata(token_id.clone(), sample_token_metadata());
    }
}
