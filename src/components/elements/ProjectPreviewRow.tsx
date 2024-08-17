import TerminalButton from "./TerminalButton";


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseStorage = import.meta.env.VITE_SUPABASE_STORAGE_PATH;
const supabaseBucket = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET;


const ProjectPreviewRow = ({ project }: { project: Project }) => {


    return(<div key={project.id} className="projectRow toContent">
        <div>
            <h2>{project.name}</h2>
        </div> 
        <img className="" src={`${supabaseUrl}/${supabaseStorage}/${supabaseBucket}/${project.image}`} alt={project.name}/> 
        <TerminalButton text="Open"  href={`/projects/${project.id}`}/>
        

    </div>)
};

export default ProjectPreviewRow;