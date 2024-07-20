import React, {useState}  from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import Home from './Home.tsx'
import {About} from './About.tsx'
import Projects from './Projects.tsx'
import Contact from './Contact.tsx'
import Error404 from './Error404.tsx'
import CommandLine from './CommandLine'
import ConfirmSubscription from "./ConfirmSubscription.tsx";
import Login from "./Login.tsx";

const Navbar = ()=>{
  const [menuOpen, setMenuOpen] = useState(false);
  const switchMenuOpen = ()=>{
    setMenuOpen(!menuOpen);
  }



  return (
    <>
    <input type="checkbox" id="openCloseMenu" name="openCloseMenu" checked={menuOpen}/>
    <nav className="navbar is-primary" role="navigation">
      <button id="openCloseLabel" aria-label="open-responsive-menu"  onClick={switchMenuOpen}>
        -<br/>
        -<br/>
        -<br/>
      </button>
      <NavLink onClick={switchMenuOpen} className="navbar-item" to="/" >
        Home
      </NavLink>
      <NavLink onClick={switchMenuOpen} className="navbar-item" to="/about" >
        About
      </NavLink>
      <NavLink onClick={switchMenuOpen} className="navbar-item" to="/projects" >
        Projects
      </NavLink>
      <NavLink onClick={switchMenuOpen} className="navbar-item" to="/contact" >
        Contact
      </NavLink>
      <NavLink onClick={switchMenuOpen} className="navbar-item" to="https://194f384b.sibforms.com/serve/MUIFAIKyVXuwU_3zwEsAWhAEVpQKwfLDf9-O6Qyr0VyjfW1bYN9LpmHp7Jf9NLjIivYWIeOQylYqBqp69tnhbqTn_1bQbUbcYRa3kqjdlm8adgu6_-Iw5kMvLORgvELqQFX94PN7PS7-g_dJyvHbLegf6BOzDmzIPjwW6Z-FztPnBq8YuhpXmJGV-Qj2-RtQSVvAQw6fEIk7KtLP" >
        Subscribe
      </NavLink>
    </nav>
    
    <Routes>
        <Route  path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/projects' element={<Projects/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/confirm-subscription' element={<ConfirmSubscription/>} />
        <Route path='/login' element={<Login/>} />
        <Route path="*" element={<Error404 />} />
    </Routes>
    {/* <ReactTerminal id="terminal" commands={commands} showControlBar={false} theme={"matrix"} prompt={">"} welcomeMessage={<p>Type help to check the available commands<br/></p>}/> */}
    <CommandLine></CommandLine>
  </>
  )
}

export default Navbar;