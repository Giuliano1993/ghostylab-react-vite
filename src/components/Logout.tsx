import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../utils/supabase";


const Logout = ()=>{

    useEffect(()=>{
        async function logout(){
            const {error} = await supabase.auth.signOut();
            if(error){
                console.log(error.message);
            }
        }
        logout();
    })
    return <Navigate to="/" replace/>
}


export default Logout;