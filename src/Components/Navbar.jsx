import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
    
    return (
        <div class ="ui secondary pointing menu">
               
                <a className="item">
                    <NavLink to="/profile">Profile</NavLink>
                </a>
                <div className="right menu">
                {props.login 
                    ?<a className="ui item" onClick={props.handleLogout}>
                        <NavLink to="/login">Logout</NavLink>                       
                    </a>
                    :
                    <>
                        <a className="ui item">
                            <NavLink to="/signup">Sign up</NavLink>
                        </a>
                        <a className="ui item">
                            <NavLink to="/login">Login</NavLink>
                        </a>
                    </>
                    }
                </div>
      </div>
    )
    
};

export default Navbar;
