import { useEffect, useState } from "react";
import PreviewLine from "../../../components/elements/PreviewLine.tsx";
import Project  from "../../../Models/Project.ts";

const ProjectIndexPage = () => {
    const [projects, setProjects] = useState<Array<Project>>([]);
    const [loading, setLoading] = useState<boolean>(false);  
    useEffect(()=>{
        
        const getProjects = async () => {
            setLoading(true);
            Project.all().then((data: Project[]) => {
                setProjects(data);
                setLoading(false);
            })
        }
        getProjects();

    },[])

    const refreshProjects = async () => {
        console.log("refreshing...");
        setLoading(true);
        Project.all().then((data: Project[]) => {
            setProjects(data);
            setLoading(false);
        })
    }
    
    return (
        <div id="admin-projects">
            <div className="header">
                <div>
                    <h1>Projects</h1>
                    <p>Projects Index Page</p>
                </div>
                <a className="btn" href="/admin/projects/new">New Project</a>
            </div>

            {loading ? ( 
                <p>Loading...</p> 
            ) : (
                console.log(projects),
                projects.map((p: Project)=>{ return (
                    <PreviewLine key={p.id} project={p} onChange={refreshProjects}/>
                )})
            )}
            
                
            
        </div>
    )
}

export default ProjectIndexPage;