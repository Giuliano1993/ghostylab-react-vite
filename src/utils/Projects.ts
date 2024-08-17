import  supabase  from './supabase';
const projectTable = import.meta.env.VITE_SUPABASE_DB_TABLE;


const Project = {
    all: async () => {
        const {data, error} = await supabase.from(projectTable).select('*');

        if(error){
            console.log(error.message);
        }else{
            return data;
        }
    },
    get: async (id: number) => {
        const {data,error} = await supabase.from(projectTable).select('*').eq('id',id);
        if(error){
            console.log(error.message);
        }else{
            return data[0];
        }
    },
    create: async (data: Project) => {
        const { data:success, error } = await supabase.from(projectTable).insert(data).select()
            
        if(success){
            return success;
        }
        if(error){
            console.log(error);
        }
    },
    update : async (id: number, data: Project) => {

        const { data:success, error } = await supabase.from('Projects').update(data).eq('id', id);
        if(data){
            return success;
        }
        if(error){
            console.log(error);
        }
    },
    delete : async (id: number) => {
        const {data,error} = await supabase.from(projectTable).delete().eq("id",id);
        if(error){
            console.log(error);
        }
        return data;
    },
}

export default Project;