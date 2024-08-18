const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseStorage = import.meta.env.VITE_SUPABASE_STORAGE_PATH;
const supabaseBucket = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET;


const ProjectPreviewRow = ({ project }: { project: Project }) => {


    return(<div key={project.id} className="projectRow">
        <div>
            <h2>{project.name}</h2>
        </div> 
        <div className="cover">
            <img className="" src={`${supabaseUrl}/${supabaseStorage}/${supabaseBucket}/${project.image}`} alt={project.name}/> 
        </div>
        <a href={`/projects/${project.id}`} className="btn">Open</a>
        

    </div>)
};

export default ProjectPreviewRow;