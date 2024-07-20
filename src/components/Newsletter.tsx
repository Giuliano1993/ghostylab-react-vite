import React from "react";
import SubscriptionForm from "./elements/SubscriptionForm.tsx";
import MondevLogo from "../assets/pics/mondev.png";

const Newsletter = () => {


    return (
        <div className="container" id="subscribe">
            <img src={MondevLogo} alt="Newsletter logo"/>
            <div>

                <p>MonDev is a Newsletter I send every monday at 9 in the morning for kick off developers week. Is always a 3-5 minute reads with article, tools or small project suggestions, everything in a light and positive mood for a great week start</p>
                <SubscriptionForm/>
            </div>
       </div>
    ) 
}

export default Newsletter;