import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { NavLink, useHistory } from 'react-router-dom';
import { RiMenuFill, RiCloseLine } from 'react-icons/ri';
import './navbar.css';
// import { login, logout, testDeploy } from '../../utils'
import logo from '../../assets/LOGO.svg'

function Navbar({ currentUser, showOptions, showOptionsFunc, login, logout }) {
  // const [signedIn, setSignedIn] = props.signedIn
  const [toggleMenu, setToggleMenu] = useState(false);
  const history = useHistory();

  function checkPath(source) {
    if (source === "home") {
      showOptionsFunc(true)
    }
    else {
      showOptionsFunc(false)
    }
  }

  useEffect(() => {
    if (window.location.pathname === "/") {
      showOptionsFunc(true)
    }
  },
    []
  )

  function homePage() {
    let path = '/'
    history.push(path);
    showOptionsFunc(true)
  }

  function Menu() {
    return (
      <>
        {showOptions ? <p><a href="#header">Home</a></p> : <p><NavLink exact to="/" onClick={() => checkPath("home")}>Home</NavLink></p>}
        {
          showOptions ?
            <>
              <p><a href="#minting-now">Minting Now</a></p>
              <p><a href="#upcoming">Upcoming</a></p>
              <p><a href="#past-mints">Past Mints</a></p>
              <p><a href="#about-us">About Us</a></p>
            </>
            :
            ""
        }
        <p><NavLink exact to="/create" onClick={() => checkPath("create")}>Create</NavLink></p>
      </>
    )
  }


  // function setButton() {
  //   return (
  //     signedIn ?
  //       <>
  //         {/* <div style={{ background: "#fff" }}> */}
  //         {/* <button type='button' style={{ background: "green" }} onClick={testDeploy}>Dashboard</button> */}
  //         <button type='button' onClick={logout}>Disconnect Wallet</button>
  //       </>
  //       :
  //       <button type='button' style={{ background: "green" }} onClick={login}>Connect Wallet</button>
  //   )
  // }

  const setButton = () => {
    return (
      currentUser ?
        <>
          <button type='button' onClick={() => logout()}>Disconnect Wallet</button>
        </>
        :
        <button type='button' style={{ background: "green" }} onClick={() => login()}>Connect Wallet</button>
    )
  }

  return (
    <div className="very-near__navbar">
      <div className="very-near__navbar-links">
        <div className="very-near__navbar-links_logo">
          <img src={logo} onClick={() => homePage()} />
        </div>
        <div className="very-near__navbar-links_container">
          <Menu />
        </div>
      </div>
      {/* <div className="very-near__navbar-sign">
        {setButton()}
      </div> */}
      <div className="very-near__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenuFill color="#fff" size={27} onClick={() => setToggleMenu(true)} />
        }
        {toggleMenu && (
          <div className="very-near__navbar-menu_container scale-up-center">
            <div className="very-near__navbar-menu_container-links">
              <Menu />
              {/* <div className="very-near__navbar-menu_container-links-sign">
                {setButton()}
              </div> */}
            </div>
          </div>
        )
        }
      </div>
    </div>
  )
}

export default Navbar