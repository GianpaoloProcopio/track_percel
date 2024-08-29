import React from "react";
import { Link } from "react-router-dom"
import logo from "../media/icona.WEBP"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

export default function Navbar(){
    const [user] = useAuthState(auth);
    return(
        <nav id="navbar">

            <div className="left">
                <Link to="/home"><img src={logo} alt="" /></Link>
                <i className="fa-solid fa-gear"></i>
            </div>

            <div className="right">
                {
                    user ? (
                        <Link to="/logout"><i className="fa-solid fa-user"></i></Link>
                    ) : (
                        <Link to="/login"><i className="fa-solid fa-user"></i></Link>
                    )
                }
                
            </div>
        </nav>

        
    )
}