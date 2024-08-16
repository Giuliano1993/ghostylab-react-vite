import { useEffect, useState } from "react";
import supabase from "../../../utils/supabase";
import PreviewLine from "./previewLine";

const ProjectIndexPage = () => {
    const [projects, setProjects] = useState<array>([]);
    const [loading, setLoading] = useState<boolean>(false);  
    useEffect(()=>{
        
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

    },[])
    
    return (
        <div>
            <h1>Projects</h1>
            <p>Projects Index Page</p>
            {loading ? ( 
                <p>Loading...</p> 
            ) : (
                console.log(projects),
                projects.map((p: Project)=>{ return (
                    <PreviewLine key={p.id} project={p} />
                )})
            )}
            
                
            
        </div>
    )
}

export default ProjectIndexPage;