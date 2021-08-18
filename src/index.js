import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { BrewShare } from './components/BrewShare';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <BrewShare />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);