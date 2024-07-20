import photo from  '../assets/pics/thisisme.jpeg'
import TerminalButton from "./elements/TerminalButton.tsx";

const Home = () => { 
 
  return(
    <>
    <div id="home" className="container">
        <section className="home-intro">
          <div>
            <img src={photo} width="200px" alt="Giuliano"/>
          </div>
          <div className="intro-titles">
            <h1>Hi! I am Giuliano</h1>
            <h3>{"/* And this is my lab */"}</h3>
          </div>
            </section>
            <section className="building" aira-label="Introductive description of what i do">
          <p>
            Hi, I'm a freelance full-stack web developer based in Rome. <br/>
            I develop websites and web apps as well as command line and automation tools and flows.<br/>
            I also write article and content about the new dev tools I always love to play around with.<br/>
            Take a look around; if you like it here, you can subscribe to my newsletter or contact me and start a conversation.<br/>
          </p>
          <div className="homeActions">
            {/* <TerminalButton href="/projects"  text="Check the projects"></TerminalButton> */}
            <TerminalButton href="https://194f384b.sibforms.com/serve/MUIFAIKyVXuwU_3zwEsAWhAEVpQKwfLDf9-O6Qyr0VyjfW1bYN9LpmHp7Jf9NLjIivYWIeOQylYqBqp69tnhbqTn_1bQbUbcYRa3kqjdlm8adgu6_-Iw5kMvLORgvELqQFX94PN7PS7-g_dJyvHbLegf6BOzDmzIPjwW6Z-FztPnBq8YuhpXmJGV-Qj2-RtQSVvAQw6fEIk7KtLP"  text="Subscribe"></TerminalButton>
            <TerminalButton href="/contact"  text="Contact me"></TerminalButton>
          </div>
        </section>
          
    </div>
  </>);
}

export default Home;

