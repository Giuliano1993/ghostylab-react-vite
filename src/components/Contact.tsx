import React, {useState, useEffect} from "react";
import { Client, Account } from "appwrite";

import TerminalButton from "./elements/TerminalButton.tsx";

//import { useLocation } from "react-router-dom";

const Contact = ()=>{
  const [formData, setFormData] = useState({
    name: '',
    mail: '',
    message: '',
    "form-name": "contact"
  })
  const [errors, setErrors] = useState({
    name: false,
    mail: false,
    message: false
  })

  const [errorMessage, setErrorMessage] = useState<string|null>(null); 

  const [success, setSuccess] = useState(false)

  const checkLogged = async () =>{
    const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) 
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT);

    const account = new Account(client);
    try {
        const user = await account.get();
        console.log(user)
    } catch (err) {
        console.log(err);
    }
  }
  useEffect(()=>{
    
    console.log(import.meta.env.VITE_APPWRITE_PROJECT) 
    checkLogged();
  },[])
  const handleData = ( e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement> ) =>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }
  const resetFormData = ()=>{
    setFormData({
      name: '',
      mail: '',
      message: '',
      "form-name": "contact"
    })
  }
  const resetErrors = ()=>{
    setErrors({
      name: false,
      mail: false,
      message: false
    })
    setErrorMessage(null);
  }
  const validateForm = ()=>{
    setSuccess(false)
    resetErrors()
    let formIsValid = true;
    if(formData.name.trim() === ''){
      formIsValid = false;
      setErrors({
        ...errors,
        name: true
      })
      console.log('serve un nome');
      setErrorMessage("Name field cannot be empty")
    }

    if(formData.mail.trim() === ''){
      formIsValid = false;
      setErrors({
        ...errors,
        mail: true
      })
      console.log('serve una mail');
      setErrorMessage("Mail field cannot be empty")
    }

    const pattern = new RegExp(/^(('[\w-\s]+')|([\w-]+(?:\.[\w-]+)*)|('[\w-\s]+')([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if(!pattern.test(formData.mail.trim())){
      formIsValid = false;
      setErrors({
        ...errors,
        mail:true
      })
      console.log('serve una mail valida');
      setErrorMessage("Need a valid email")
    }



    if(formData.message.trim() === ''){
      formIsValid = false;
      setErrors({
        ...errors,
        message : true
      })
      setErrorMessage("Message field cannot be empty")
    }

    return formIsValid
  }
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(!validateForm()) return;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        setSuccess(true)
        resetFormData()
      })
      .catch((error) => alert(error));
  }
  return(

    <div className="container" id="contacts">
      <h1>Contact me</h1>
      <p>
        Did youn like my small lab? You want to start a conversation about coding? 
        You want to hire me for some project or at least ask for an estimate? 
        You need a mentor to guide you through the path of being a developer? 
        You can write me directly here, i will contact you ASAP ;) 
        If you prefer to reach out on social media, here you can also find links to connect 
      </p>
      <div id="contact_line">
        <div>
        <form name="contact" method="post" action="/contact"   data-netlify="true" onSubmit={handleSubmit}>
          <input type="hidden" name="form-name" value="contact" />
          <div>
            <div>
              <label htmlFor="namet">Name: </label>
              <input type="text" required name="name" onChange={handleData} value={formData.name} className={`form-control ${errors.name ? 'error' : ''}`}/>
            </div>
            <div>
              <label htmlFor="mail">Mail: </label>
              <input type="mail" required name="mail" onChange={handleData} value={formData.mail} className={`form-control ${errors.mail ? 'error' : ''}`}/>
            </div>
            <div>
              <label htmlFor="message">Message:</label>
              <textarea name="message" required onChange={handleData} value={formData.message} className={`form-control ${errors.message ? 'error' : ''}`}></textarea>
            </div>
            <div>
              <button type="submit">Send</button>
            </div>
          </div>
          {success ? (<div className="success message">Thank you for contacting me. I will read your mail and contact you asap ;)</div> ) 
            : 
            ("")}
          {errorMessage ? (<div className="error message">{errorMessage}</div>) : ("")}
        </form>

        </div>
        <div>         
          <div>
            <TerminalButton text="Dev.to"  href={"https://dev.to/giuliano1993"}/>
            <TerminalButton text="LinkedIn"  href={"https://www.linkedin.com/in/giuliano-gostinfini/"}/>
            <TerminalButton text="Twitter"  href={"https://twitter.com/gosty93"}/>
            <TerminalButton text="Github"  href={"https://github.com/Giuliano1993"}/>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Contact;