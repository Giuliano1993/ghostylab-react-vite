import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../utils/supabase";
import useToken from "../utils/useToken";

const Logout = ()=>{
    const {setToken} = useToken();
    useEffect(()=>{
        async function logout(){
            const {error} = await supabase.auth.signOut();
            if(error){
                console.log(error.message);
            }else{
                setToken(null);
            }
        }
        logout();
    })
    return <Navigate to="/" replace/>
}


export default Logout;