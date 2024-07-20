import React from "react"
import { useLocation } from "react-router-dom";

const ConfirmSubscription = ()=>{


    const search = useLocation().search;
    const successParam=new URLSearchParams(search).get("success");
    console.log(successParam)

    return (
        <div id="projects-container" className="container">
            <div>
                {
                successParam === null ? (
                    <p>I sent you a verification mail to your given address! To confirm your subscription click on the confirmation link you will find there</p>
                ) : (
                    <p>Thank you for subscribing. You'll soon receive a welcome mail, then see you on monday ;)</p>
                )}
          </div>  
        </div> 
    );
}
export default ConfirmSubscription;