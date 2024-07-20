import { useNavigate } from "react-router-dom";
import { ReactTerminal } from "react-terminal";
import { skills } from "./About.tsx";
import axios from "axios";
import { useRef } from "react";
const CommandLine = () => {
  const navigate  = useNavigate();

  const terminalReference = useRef(null);

  const toggleTerminal = ()=>{

    const terminalContainer = terminalReference.current;
    terminalContainer.classList.toggle('force-show')
  }
  const skillsRows = []
  skills.forEach((el)=>{
    skillsRows.push(<div key={el}>{el}</div>);
  })

  const commands = {
    whoami: "jackharper",
    //cd: (directory) => `changed path to ${directory}`
    cd: (path) => path !== 'home' && path !== 'subscribe' ? navigate('/'+path) : ( path !== 'subscribe' ? navigate('/') : window.location.replace('https://194f384b.sibforms.com/serve/MUIFAIKyVXuwU_3zwEsAWhAEVpQKwfLDf9-O6Qyr0VyjfW1bYN9LpmHp7Jf9NLjIivYWIeOQylYqBqp69tnhbqTn_1bQbUbcYRa3kqjdlm8adgu6_-Iw5kMvLORgvELqQFX94PN7PS7-g_dJyvHbLegf6BOzDmzIPjwW6Z-FztPnBq8YuhpXmJGV-Qj2-RtQSVvAQw6fEIk7KtLP')),
    ls: ()=> <div>
      <p>home</p>
      <p>about</p>
      <p>projects</p>
      <p>contact</p>
      <p>subscribe</p>
    </div>,
    pokemon: async ()=>{
      const poke = await axios(`https://pokeapi.co/api/v2/pokemon?limit=151`).then((res)=>{
        const random_number = Math.floor(Math.random() * 150); 
        return res.data.results[random_number]
      }).then(async (res)=>{
        return await axios(res.url).then((res)=>res.data)
      })
      console.log(poke)
      return <div> <img src={poke.sprites.front_default} alt="Front of poke"/><span>{poke.name}</span></div>
    },
    articles: async ()=>{
      const articles = await axios.get("https://dev.to/api/articles?username=giuliano1993&per_page=20").then((res)=>{
        return res.data
      })
      return articles.filter((a)=>a.collection_id !== 25147).map((a)=><div><a href={a.url}>{a.title}</a></div>)
    },
    help: <div>
        <p><b>CD </b> prompt:  go to this page</p>
        <p><b>ls </b>: lists the available paths</p>
        <p><b>clear </b>: empty the terminal</p>
        <p><b>skills </b>: show a short list of my skills</p>
        <p><b>articles </b>: show the links to my most recent articles</p>
      </div>,
    skills: <div>
      <div>
        {skillsRows}
        {/* <div>
          +-------------------------+<br/>
          |          Hello          |<br/>
          +-------------------------+<br/>
          |                         |<br/>
          |                         |<br/>
          |                         |<br/>
          |                         |<br/>
          |                         |<br/>
          |                         |<br/>
          |                         |<br/>
          |                         |<br/>
          |                         |<br/>
          +-------------------------+
          </div> */}
      </div>
    </div>
  };
  return(
    <div ref={terminalReference}>
    <div id="terminalToggler" onClick={toggleTerminal}>
      Toggle Terminal
    </div>
      <ReactTerminal className="scrollbar-hidden" id="terminal"  commands={commands} showControlBar={false} theme={"matrix"} prompt={">"} welcomeMessage={<p>Type help to check the available commands<br/></p>}/>
    </div>
    
  )
}

export default CommandLine;