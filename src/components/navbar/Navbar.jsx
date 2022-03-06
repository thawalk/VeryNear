import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiMenuFill, RiCloseLine } from 'react-icons/ri';
import './navbar.css';
import { login, logout, testDeploy } from '../../utils'

function Navbar(props) {
  const [signedIn, setSignedIn] = props.signedIn
  const [toggleMenu, setToggleMenu] = useState(false);

  function Menu() {
    return (
      <>
        {/* <p><NavLink exact to="/" activeClassName='active'>Home</NavLink></p>
        <p><NavLink exact to="/minting-now" activeClassName='active'>Minting Now</NavLink></p>
        <p><NavLink exact to="/upcoming" activeClassName='active'>Upcoming</NavLink></p>
        <p><NavLink exact to="/past" activeClassName='active'>Past</NavLink></p>
        <p><NavLink exact to="/about" activeClassName='active'>About</NavLink></p>
        <p><NavLink exact to="/create" activeClassName='active'>Create</NavLink></p> */}

        <p><NavLink exact to="/" activeClassName='active'>Home</NavLink></p>
        <p><a href="#minting-now" activeClassName='active'>Minting Now</a></p>
        <p><a href="#upcoming" activeClassName='active'>Upcoming</a></p>
        <p><NavLink exact to="/create" activeClassName='active'>Create</NavLink></p>
        <p><a href="#past-mints" activeClassName='active'>Past</a></p>
        <p><a href="#about-us" activeClassName='active'>About Us</a></p>
      </>
    )
  }


  function setButton() {
    return (signedIn
      ? <>
        {/* <div style={{ background: "#fff" }}> */}
        <button type='button' style={{ background: "green" }} onClick={testDeploy}>Dashboard</button>
        <button type='button' onClick={logout}>Sign Out</button>
      </>
      : <button type='button' style={{ background: "green" }} onClick={login}>Sign In</button>
    )
  }

  return (
    <div className="very-near__navbar">
      <div className="very-near__navbar-links">
        <div className="very-near__navbar-links_logo">
          {/* insert very near logo */}
        </div>
        <div className="very-near__navbar-links_container">
          <Menu />
        </div>
      </div>
      <div className="very-near__navbar-sign">
        {setButton()}
      </div>
      <div className="very-near__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenuFill color="#fff" size={27} onClick={() => setToggleMenu(true)} />
        }
        {toggleMenu && (
          <div className="very-near__navbar-menu_container scale-up-center">
            <div className="very-near__navbar-menu_container-links">
              <Menu />
              <div className="very-near__navbar-menu_container-links-sign">
                {setButton()}
              </div>
            </div>
          </div>
        )
        }
      </div>
    </div>
  )
}

export default Navbar