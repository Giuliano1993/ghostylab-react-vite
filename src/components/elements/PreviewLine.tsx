import supabase from "../../utils/supabase";



const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseStorage = import.meta.env.VITE_SUPABASE_STORAGE_PATH;
const supabaseBucket = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET;

const PreviewLine: React.FC<ProjectLineProps> = ({project,onChange}) => {
    const projectTable = import.meta.env.VITE_SUPABASE_DB_TABLE_PROJECTS;
    const deleteAction = async (id: number) => {
        console.log(id);
        const {data,error} = await supabase.from(projectTable).delete().eq("id",id);
        if(error){
            console.log(error);
        }else{
            console.log(data);
            onChange(); 
        }
    }
    return(<div key={project.id} className="adminProjectRow">
        <div>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
        </div> 
        <img className="" src={`${supabaseUrl}/${supabaseStorage}/${supabaseBucket}/${project.image}`} alt={project.name}/> 
        <div className="actions">
            <a className="btn " href={project.link}>Link</a>
            <a className="btn edit" href={`/admin/projects/${project.id}/edit`}>Modifica</a>
            <button className="btn delete" onClick={async ()=> await deleteAction(project.id)} data-id={project.id}>Elimina</button>
        </div>

    </div>)
}

export default PreviewLine;