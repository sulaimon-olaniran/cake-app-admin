import React from 'react'
import { auth } from '../../services/Firebase'
import './NavBar.css'
import { NavLink } from 'react-router-dom'

const NavBar = ({ loggedIn }) => {
    
    const signOutUser = () => {
        auth.signOut()
    }

    const handleLinkClass = loggedIn ? "links-con" : "hide-links"
    return (
        <div className="navbar-con">

            <div className="links-wrapper">
                <ul className={handleLinkClass}>
                    <NavLink to='/addcakes'>
                        <li>Cakes</li>
                    </NavLink>
                    <NavLink to='/addcupcakes' >
                        <li>Cupcakes</li>
                    </NavLink>
                    <button onClick={signOutUser}>Sign Out</button>
                </ul>
            </div>
        </div>
    )
}

export default NavBar