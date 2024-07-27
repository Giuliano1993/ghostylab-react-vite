import {useEffect, useState}  from "react";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import Home from './Home.tsx'
import {About} from './About.tsx'
import Projects from './Projects.tsx'
import Contact from './Contact.tsx'
import Error404 from './Error404.tsx'
import CommandLine from './CommandLine.tsx'
import ConfirmSubscription from "./ConfirmSubscription.tsx";
import Login from "./Login.tsx";
import Logout from "./Logout.tsx";
import supabase from "../utils/supabase.ts";
import { User } from "@supabase/supabase-js";

const Navbar = ()=>{
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const switchMenuOpen = ()=>{
    setMenuOpen(!menuOpen);
  }

  const checkLogged = async () =>{
    const { data: { user } } = await supabase.auth.getUser()
      
      
      try {
        if(user){
          setIsLoggedIn(true);
          console.log(user);
        }
    } catch (err) {
        console.log(err);
    }
  }
  useEffect(()=>{
    checkLogged();
  },[])

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
        <Route path='/logout' element={<Logout/>} />
        <Route path="*" element={<Error404 />} />
        {isLoggedIn ? (
          <Route path='/protected' element={<p>Protected</p>} />
        ):( 
        <Route path="/protected" element={<Navigate to="/" replace />} />) }
    </Routes>
    {/* <ReactTerminal id="terminal" commands={commands} showControlBar={false} theme={"matrix"} prompt={">"} welcomeMessage={<p>Type help to check the available commands<br/></p>}/> */}
    <CommandLine></CommandLine>
  </>
  )
}

export default Navbar;