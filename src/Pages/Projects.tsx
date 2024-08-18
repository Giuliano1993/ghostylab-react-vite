//import TerminalButton from "../components/elements/TerminalButton.tsx";
import labImg from '../assets/pics/LAB_TAB.png';
import { useEffect, useState } from "react";
import ProjectPreviewRow from "../components/elements/ProjectPreviewRow.tsx";
import Project from "../Models/Project.ts";

const Projects = () => {
  const [projects, setProjects] = useState<Array<Project>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(()=>{
        
    const getProjects = async () => {
        setLoading(true);
        Project.all(true).then((data) => {
            setProjects(data);
            setLoading(false);
        })
    }
    getProjects();

},[])
  

  return (

    <div id="projects-container" className="container">
      <img src={labImg} alt="an hash art of laboratory tools"/>
      <h1>My projects</h1>
      <div className="toContent">
        {loading ? (
          <p>Loading...</p>
        ) : (
          projects.map((p: Project) => <ProjectPreviewRow project={p} key={p.id}/> )
        )}
      </div>
    </div>
    // <div id="projects-container" className="container">
    //    <div>
    //     <img src={labImg} alt="an hash art of laboratory tools"/>
    //     <h1>My projects</h1>
    //     <p>I love build and share small funny projects.</p>
    //     <p>This is the heart of my lab, so here you won't probably find my work projects, but most likely some of my personal coding experiments.</p>
    //     <p>This page is still under construction, but while you wait for the coding projects to be organized (you can still find them on github ), why don't you take a look at the coding contents? </p>
    //     <div id="toContent">
    //       <TerminalButton text="My articles on Dev.to"  href={"https://dev.to/giuliano1993"}/>
    //       <TerminalButton text="My LinkedIn profile"  href={"https://www.linkedin.com/in/giuliano-gostinfini/"}/>
    //       <TerminalButton text="Github"  href={"https://github.com/Giuliano1993"}/>
    //     </div>
    //   </div> 
   
    // </div>
  )
}

export default Projects;