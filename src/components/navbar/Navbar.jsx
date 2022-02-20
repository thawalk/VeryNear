import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiMenuFill, RiCloseLine } from 'react-icons/ri';
import './navbar.css';



const Menu = () => (
  <>
    <p><NavLink to="/" activeClassName='active'>Home</NavLink></p>
    <p><a href="#minting_now">Minting Now</a></p>
    <p><a href="#upcoming">Upcoming</a></p>
    <p><a href="#past">Past</a></p>
    <p><a href="#about_us">About Us</a></p>
    <p><a href="#create">Create</a></p>
  </>
)

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="verynear__navbar">
      <div className="verynear__navbar-links">
        <div className="verynear__navbar-links_logo">
          {/* insert very near logo */}
        </div>
        <div className="verynear__navbar-links_container">
          <Menu />
        </div>
      </div>
      <div className="verynear__navbar-sign">
        <button type='button'>Sign In</button>
      </div>
      <div className="verynear__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenuFill color="#fff" size={27} onClick={() => setToggleMenu(true)} />
        }
        {toggleMenu && (
          <div className="verynear__navbar-menu_container scale-up-center">
            <div className="verynear__navbar-menu_container-links">
              <Menu />
              <div className="verynear__navbar-menu_container-links-sign">
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