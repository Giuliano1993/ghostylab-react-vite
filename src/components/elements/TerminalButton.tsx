import React from "react";
import { NavLink } from "react-router-dom";



const TerminalButton: React.FC<ButtonProps> = ({href,text}) =>{
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

export default TerminalButton;