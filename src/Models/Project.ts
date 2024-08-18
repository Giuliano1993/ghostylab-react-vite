import  supabase  from '../utils/supabase';
const projectTable = import.meta.env.VITE_SUPABASE_DB_TABLE;



const Project: ProjectInterface = {
    all: async (publicOnly = false) => {
        const query = supabase.from(projectTable).select('*');
        if(publicOnly){
            query.is('public',true);
        }
        const {data, error} = await query;
        if(error){
            console.log(error.message);
            return []
        }else{
            return data;
        }
    },
    get: async (id) => {
        const {data,error} = await supabase.from(projectTable).select('*').eq('id',id);
        if(error){
            console.error(error);
            return null;
        }else{
            return data[0];
        }
    },
    create: async (project) => {
        const { data, error } = await supabase.from(projectTable).insert(project).select()
            
        if(error){
            console.error(error);
            return null
        }

        return data[0];
    },
    update : async (id, project) => {
        
        const { error } = await supabase.from(projectTable).update(project).eq('id', id);
        if(error){
            throw new Error(error.message);
        }
        

        return true;
    },
    delete : async (id) => {
        const {error} = await supabase.from(projectTable).delete().eq("id",id);
        if(error){
            throw new Error(error.message);
            console.log(error);
        }
        return true;
    },
}

export default Project;