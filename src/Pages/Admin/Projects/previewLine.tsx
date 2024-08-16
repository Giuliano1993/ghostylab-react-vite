


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseStorage = import.meta.env.VITE_SUPABASE_STORAGE_PATH;
const supabaseBucket = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET;

const PreviewLine: React.FC<ProjectLineProps> = ({project}) => {
    return(<div key={project.id}>
        <h2>{project.name}</h2>
        <p>{project.description}</p>
        <img src={`${supabaseUrl}/${supabaseStorage}/${supabaseBucket}/${project.image}`} alt={project.name}/> 
        <div className="actions">
            <a className="btn " href={project.link}>Link</a>
            <a className="btn edit" href={`/admin/projects/${project.id}/edit`}>Modifica</a>
            <button className="btn delete" data-id={project.id}>Link</button>
        </div>

    </div>)
}

export default PreviewLine;