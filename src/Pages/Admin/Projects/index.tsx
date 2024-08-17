import { useEffect, useState } from "react";
import supabase from "../../../utils/supabase";
import PreviewLine from "../../../components/elements/PreviewLine.tsx";

const ProjectIndexPage = () => {
    const [projects, setProjects] = useState<Array<Project>>([]);
    const [loading, setLoading] = useState<boolean>(false);  
    useEffect(()=>{
        
        const getProjects = async () => {
            setLoading(true);
            const user = await  supabase.auth.getUser();
            console.log(user);
            const {data, error} = await supabase.from('Projects').select('*');

            if(error){
                console.log(error.message);
            }else{
                setProjects(data);
                setLoading(false);
            }
        }
        getProjects();

    },[])

    const refreshProjects = async () => {
        console.log("refreshing...");

        const getProjects = async () => {
            setLoading(true);
            const {data, error} = await supabase.from('Projects').select('*');

            if(error){
                console.log(error.message);
            }else{
                setProjects(data);
                setLoading(false);
            }
        }
        getProjects();
        console.log("refreshed");
    }
    
    return (
        <div>
            <h1>Projects</h1>
            <p>Projects Index Page</p>
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