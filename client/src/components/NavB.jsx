import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./Nav.css"
import logo from './logo.png'


const NavB = () => {

    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <nav style={{ padding: '0px 20px' }} className="navbar">
                <div className="navbar__logo">
                    <NavLink to="/">
                        <img src={logo} alt="" />
                    </NavLink>
                </div>

                <ul style={{ marginBottom: "0px", paddingLeft: "0" }} className={open ? "navbar__list active" : "navbar__list"}>
                    
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/register">Register</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contactus">Contact Us</NavLink>
                    </li>
                </ul>
                <div className="navbar__menu" onClick={handleClick}>
                    <div className={open ? "navbar__menu-icon open" : "navbar__menu-icon"}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
        </>
    )
}


export default NavB