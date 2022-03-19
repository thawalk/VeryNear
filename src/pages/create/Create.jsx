import React, { useEffect, useRef, useState } from "react";
import './create.css';
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { NavLink } from "react-router-dom";

const userData = {
  username: "dabipotato",
  userEmail: "dabipotato@gmail.com"
}

const Create = ({ currentUser }) => {
  const fileRef = useRef()
  const zipfileRef = useRef()
  const [ selectedImage, setSelectedImage ] = useState(null)
  const [ imageUrl, setImageUrl ] = useState(null)

  const [ tokenMetadataZip, setTokenMetadataZip ] = useState(null)

  const defaultValues = {
      name: '',
      symbol: '',
      version: '',
      launchDate: ''
  }

  const methods = useForm({ defaultValues })
  const { register } = methods;

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage))
    }
  }, [selectedImage])

  const onSubmit = e => {
    e.preventDefault();
    methods.handleSubmit(data => {
      console.log("DATA:", data)

      console.log("Image:", selectedImage)
      console.log("Token Metadata Zip:", tokenMetadataZip)
    })(e)
  }

  // console.log('Selected')

  return (
    // currentUser ?
    
    <div className="very-near__create section__padding">
      {/* <aside>
        <div className="position-stick">
          <div className="sidebar">
            <div className="sidebar-content">
              <h1 >
                {userData.username}
              </h1>
              <h2>
                {userData.userEmail}
              </h2>
                <NavLink to='/create/nfts' className="sidebar-button" activeClassName="sidebar-buttonClicked">My NFTs</NavLink>  
                <NavLink to='/create/projects' className="sidebar-button" activeClassName="sidebar-buttonClicked">My Projects</NavLink>    
                <NavLink to='/create/create' className="sidebar-button" activeClassName="sidebar-buttonClicked">Create</NavLink>
                <NavLink to='/create/settings' className="sidebar-button" activeClassName="sidebar-buttonClicked">Account Settings</NavLink>  
            </div> */}

            {/* <div className="sidebar-signout">
              <button>Sign out</button> 
            </div> */}
          {/* </div>
        </div>
      </aside> */}

      {/* <aside>
        <div className="position-stick">
          <div className="divider" />
        </div>
      </aside> */}
      
      
      <div className="main">
        <h1 >
          Create your NFT project
        </h1>
        <h2>Create your own NFT project simply filling up this 10 minute form</h2>
        
        <FormProvider
          {...methods}
          defaultValues={defaultValues}  
        >
          <div className="form-wrapper">
            <h3>Contract Metadata</h3>

            <div className="input-wrapper">
              <p>Contract name</p>
              <input {...register("name")} placeholder="eg. 'Mochi Rising - Digital Edition' or 'Metaverse 3'"/>
            </div>

            <div className="input-wrapper">
              <p>Symbol</p>
              <input {...register("symbol")} placeholder="eg. 'MOCHI'"/>
            </div>

            <div className="input-wrapper">
              <p>Version</p>
              <input {...register("version")} placeholder="Essentially a version like 'nft-1.0.0'"/>
            </div>

            <div className="input-wrapper">
              <p>Launch date</p>
              <input {...register("launchDate")} placeholder="DD-MM-YYYY" />
            </div>

            <div className="input-wrapper">
              <p>Icon</p>
              <>
                <button onClick={() => fileRef.current.click()}>Upload Image</button>
                <input ref={fileRef} type='file' accept="image/*" id="select-image" onChange={e => setSelectedImage(e.target.files[0])} hidden/>
              </>
              { imageUrl && selectedImage && (
                <img src={imageUrl} alt={selectedImage.name} height='300px' width='300px' />
              )}
            </div>


            <h3>Token Metadata Zipfile</h3>
            <div className="input-wrapper">
              <>
                <button onClick={() => zipfileRef.current.click()}>Upload zipfile</button>
                <input ref={zipfileRef} type='file' accept=".zip, .rar, .7zip" id="select-image" onChange={e => setTokenMetadataZip(e.target.files[0])} hidden/>
              </>
              { tokenMetadataZip && (
                <p>{tokenMetadataZip.name}</p>
              )}
            </div>

            <button onClick={onSubmit}>Submit</button>
          </div>
        </FormProvider>
      </div>
    </div>
    // :
    // <div className="center">
    // <h1>
    //   Connect your wallet!
    // </h1>
    // </div>
  
  );
}

export default Create;