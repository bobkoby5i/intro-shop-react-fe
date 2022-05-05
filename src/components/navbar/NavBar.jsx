import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import UserService from "../../services/user.service";
import './NavBar.css';


const NavBar = ({title, icon}) => {


    const onLogout =  (e) => {
        e.preventDefault();
        UserService.logout();
        // clearContacts();
    }

    const authLinks = (
        <>
            {/* <li>Hello {user && user.name}</li> */}
            <li><a onClick={onLogout} href="#!">
                    <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout {true && "(BOB)"}</span>
                </a>
            </li>
        </>
    );

    const guestLinks = (
        <>
              <li>
                    <Link to='/register'><i className="fas fa-user-plus hide-sm"></i>{" "}Register</Link>
                </li>
                <li>
                    <Link to='/login'><i className="fas fa-sign-in-alt hide-sm"></i>{" "}Login</Link>
                </li>
                <li><a onClick={onLogout} href="#!">
                    <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout {true && "(BOB)"}</span>
                </a>
            </li>                
        </>
    );    
    let isAuthenticated=false;

    return(
        <div  className="navbar bg-primary">
            <h1>
                <i className={icon}/> 
                <Link to='/'>{title}</Link>
            </h1>
            <ul>
                <li>
                    <Link to='/admin'>Admin</Link>
                </li>
                <li>
                    <Link to='/home'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
    )
}


NavBar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

NavBar.defaultProps = {
    title: 'Intro Shop',
    icon: 'fas fa-id-card-alt'
}

export {NavBar};