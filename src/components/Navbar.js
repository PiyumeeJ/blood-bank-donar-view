import React, { useState, useEffect, useContext} from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { AuthenticationContext } from '../contexts/AuthenticationContext';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const {isAuthenticated, toggleAuth} = useContext(AuthenticationContext)

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => {
    setClick(false);
  };

  const logoutUser = () => {
    localStorage.setItem("token","");
    toggleAuth();
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      // if (localStorage.getItem("token") == "") {
      //   setButton(true);
      // } else {
      //   setButton(false);
      // }
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    if (localStorage.getItem("token") != "") {
      toggleAuth();
    }
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            Blood Bank
            <i className='fa fa-university' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li>
              <Link
                to='/sign-up'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                to='/sign-in'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign In
              </Link>
            </li>
          </ul>
          {isAuthenticated && (<Link to='/account' className='nav-links' onClick={closeMobileMenu}>
                Account
          </Link>)}
          {isAuthenticated && (<Link to='/' className='nav-links' onClick={logoutUser}>
                Log Out
              </Link>)}
          {button && !isAuthenticated && <Button buttonStyle='btn--outline' link='/sign-up'>SIGN UP</Button>}
          {button && !isAuthenticated && <Button buttonStyle='btn--outline' link='/sign-in'>SIGN IN</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;