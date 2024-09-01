import supabase from "../utils/supabase";

const articleTable = import.meta.env.VITE_SUPABASE_DB_TABLE_ARTICLES;


const Articles : ArticleInterface = {
    all: async (publicOnly = false) => {
        const query = supabase.from(articleTable).select('*');
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
        const {data,error} = await supabase.from(articleTable).select('*').eq('id',id);
        if(error){
            console.error(error);
            return null;
        }else{
            return data[0];
        }
    }, 
    create: async (article) => {
        const { data, error } = await supabase.from(articleTable).insert(article).select()
            
        if(error){
            console.error(error);
            return null
        }

        return data[0];
    },
    update : async (id, article) => {
        
        const { error } = await supabase.from(articleTable).update(article).eq('id', id);
        if(error){
            throw new Error(error.message);
        }
        

        return true;
    },
    delete : async (id) => {
        const {error} = await supabase.from(articleTable).delete().eq("id",id);
        if(error){
            throw new Error(error.message);
            console.log(error);
        }
        return true;
    },
    

}

export default Articles;