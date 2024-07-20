import { NavLink } from "react-router-dom";
import React from "react";

export default function TerminalButton({href,text}){
  return(
    <NavLink className="navbar-item" to={href} >
      <div>+-------<span className="d-lg-none" >--</span>-------------------+</div>
      <div>
        <p className="side">|</p>
        <p>{text}<span className="pointer"></span></p>
        <p className="side">|</p>
      </div>
      <div>+-----------<span className="d-lg-none" >--</span>---------------+</div>
    </NavLink>
  );
}