import { useState, useEffect } from 'react';
import '../assets/css/style.css'
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom'

const Intro = (): JSX.Element => {
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
  const initialIntroduced = window.localStorage.getItem('introduced') === 'true' || false;
  const [introduced, setIntroduced] = useState(initialIntroduced);

  const location = useLocation();
  useEffect(() => {
    if(!introduced && location.pathname === '/'){
      document.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          document.getElementById('welcome-container')?.classList.add('scale-out-horizontal')
          setTimeout(() => {
            setIntroduced(true);
            window.localStorage.setItem('introduced','true')
          }, 500);
          
        }
      })
      document.addEventListener('click', function () {
          document.getElementById('welcome-container')?.classList.add('scale-out-horizontal')
          setTimeout(() => {
            setIntroduced(true);
            window.localStorage.setItem('introduced','true')  
          }, 500);
      })
      write().then(() => {
        // document.addEventListener('keypress', function (e) {
        //   if (e.key === 'Enter') {
        //     document.getElementById('welcome-container').classList.add('scale-out-horizontal')
        //     setTimeout(() => {
        //       setIntroduced(true);
        //     }, 500);
            
        //   }
        // })
        // document.addEventListener('click', function (e) {
        //     document.getElementById('welcome-container').classList.add('scale-out-horizontal')
        //     setTimeout(() => {
        //       setIntroduced(true);  
        //     }, 500);
        // })
      });
    }
  })


  const write = async () => {
    const lines = [
      "Welcome to Ghostylab",
      "This is the place where i put my works,",
      "experiments,",
      "and stuffs",
      "[Press Enter to continue]"
    ];
    for (let i = 0; i < lines.length; i++) {
      await writeEs8(lines[i])
    }
  }

  const writeEs8 = async (text: string) => {
    try {
      const speed = 100;
      for (let i = 0; i < text.length; i++) {
        const el = document.getElementById('welcomeText')
        const html = el?.innerHTML;
        if(el){
          el.innerHTML = html + text.charAt(i);
        }
        await delay(speed)
      }
      const welcomeText = document.getElementById('welcomeText');
      const html = welcomeText?.innerHTML;
      if(welcomeText){
        welcomeText.innerHTML = html + '<br>';
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (!introduced && location.pathname === '/') {
    return( <div id="welcome-container" className="container">
        <div>
          <span id="welcomeText"></span>
          <span className="pointer"></span>
        </div>
      </div>)
    ;
  } else {
    return (
        <Navbar></Navbar>
    )

  } 


}



export default Intro;