import { useState } from "react";


export default function useToken() {

    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        console.log(tokenString);
        const userToken = JSON.parse(tokenString||"{}");
        console.log(userToken);
        return userToken;
    }
    const [token, setToken] = useState<string | null>(getToken());

    const saveToken = (userToken: string|null) => {
        localStorage.setItem('token', userToken as string);
        setToken(userToken);
    }
    return{
        setToken: saveToken,
        token
    }
}