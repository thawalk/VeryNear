import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiMenuFill, RiCloseLine } from 'react-icons/ri';
import './navbar.css';



const Menu = () => (
  <>
    <p><NavLink exact to="/" activeClassName='active'>Home</NavLink></p>
    <p><NavLink exact to="/minting-now" activeClassName='active'>Minting Now</NavLink></p>
    <p><a href="#upcoming">Upcoming</a></p>
    <p><a href="#past">Past</a></p>
    <p><a href="#about_us">About Us</a></p>
    <p><a href="#create">Create</a></p>
  </>
)

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

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
        <button type='button'>Sign In</button>
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
                <button type='button'>Sign In</button>
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