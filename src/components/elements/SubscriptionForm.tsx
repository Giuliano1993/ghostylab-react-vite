import React, {useState} from "react";
//import ItFlag from "../../assets/pics/IT_flag.png";
//import EnFlag from "../../assets/pics/EN_flag.png";
const SubscriptionForm = () => {
 
    const [formData, setFormData] = useState({
        name: '',
        mail: '',
        lang: 'EN',
        "form-name": "subscribe"
      })
    
      const [success, setSuccess] = useState(false)

      const [errors, setErrors] = useState({
        name: false,
        mail: false,
        message: false
      })
    
      const [errorMessage, setErrorMessage] = useState<string|null>(null); 
    
    
      const handleData = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) =>{
        console.log('helo')
        console.log(e)
        setFormData({
          ...formData,
          [e.target.name]:e.target.value
        })
      }
      const resetFormData = ()=>{
        setFormData({
          name: '',
          mail: '',
          lang: 'EN',
          "form-name": "subscribe"
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
        let formIsValid = true;
        setSuccess(false)
        resetErrors()
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
    
    
    
        return formIsValid
      }

      const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
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
        <form name="subscribe" method="post" action="/subscribe" data-netlify="true" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="namet">Name: </label>
                <input type="text" required name="name" onChange={handleData} value={formData.name} className={`form-control ${errors.name ? 'error' : ''}`}/>
            </div>
            <div>
                <label htmlFor="mail">Mail: </label>
                <input type="mail" required name="mail" onChange={handleData} value={formData.mail} className={`form-control ${errors.mail ? 'error' : ''}`}/>
            </div>
            <div className="flags" >
              <p>Pick the language for the newsletters you'll receive: </p>

              <select name="lang" id="lang" onChange={handleData} value={formData.lang} className="form-control">
                <option value="EN">English</option>
                <option value="IT">Italiano </option>
              </select>
            </div>
            <div>
                <button type="submit">Subscribe</button>
            </div>
            {success ? (
            <div className="success message">Thank you for subscribing. You'll soon receive a welcome mail, then see you on monday ;)</div>) 
            : 
            ("")}
            {errorMessage ? (<div className="error message">{errorMessage}</div>) : ("")}
    </form>
    )
}

export default SubscriptionForm;