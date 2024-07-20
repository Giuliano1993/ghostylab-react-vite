import React from "react";
import '../assets/css/style.css';


export const SkillBox = (props)=>{
  // TODO : add dropdown alle skill, con stile ls alberato
  // mostrando conoscenze relative tipo su php -> laravel, symfony, wordpress
  // su js ->react e vue
  // su css -> bootstrap, tailwind sass
  // da ragionare :D 
  return(
    <div className="skill-box">
      <div>[</div>
      <div className="skill-left-fill"></div>
      <div className="skill-text">{props.skill}</div>
      <div className="skill-right-fill"></div>
      <div>]</div>
    </div>
  )
}

export const skills = [
  "Php",
  "Laravel",
  "Symfony",
  "Wordpress",
  "Javascript",
  "React",
  "Vue",
  "Python"
]; 
export const About = () => {


  const skillsRows: JSX.Element[] = []

  skills.forEach((el,i)=>{
    skillsRows.push(<SkillBox skill={el} key={i}></SkillBox>);
  })
  return(
    <div className="about-page container">

      <div className="aboutText">
        <h2>Hello there</h2>
        <p>I'm <b>Giuliano</b> and I'm a <b>freelance full stack web developer</b> based in Rome.</p>
        <p>My love for code was born when i was around 12, and as time passed by, it has grown with me. 
        I really believe in the power of knowledge and in having a <b>flexible mindset</b>, so no wonder i started working as a Dev when i was 23 while taking a literature degree.</p> 
        <p>Coding for me has always been, first of all, a way of playing around and experimenting with. It's something in between an artistic and a technical work, very artisan like, and can't stop being in love with it.</p> 
        <p>This is why I love to vary my stack and the projects i work on, from websites, to web-apps, from command line tools to automation processes.</p> 
        <br/>
        <p>I lately started also <b>teaching</b> junior developers and <b>writing</b> dev articles. In the last years the love for <b>sharing knowledge</b> has grown in me more and more, and it's finding its way in my everyday life, and couldn't be more happy and satisfied with it. </p>
        <br/>
        
        <p>Putting it all together, I'm always up for a <b>challenge</b>, trying new technologies, mentor developers, automating the harder tasks... I like to mix it all up, have a communication with my client and propose the best solutions.</p>
        <h2>So, what have you got for me to <b>build</b>? ;) </h2>

      </div>
      <div id="skills">     
        <h2>Some of the things I'm good at:</h2>
        {skillsRows}
      </div>
    </div>
    
  )
}

//export {About, SkillBox, skills};



/*


+-------------------------+
|          Hello          |
+-------------------------+
|                         |
|                         |
|                         |
|                         |
|                         |
|                         |
|                         |
|                         |
|                         |
+-------------------------+
*/ 