import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import Intro from './components/Intro';
import {BrowserRouter as Router} from 'react-router-dom';
import { TerminalContextProvider } from 'react-terminal';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TerminalContextProvider>
    <Router>
      <Intro />
    </Router>
  </TerminalContextProvider>
)
