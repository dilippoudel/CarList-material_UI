import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
//import Carlist from './CarList/carList'

ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<App />, document.getElementById('root1'));

registerServiceWorker();
