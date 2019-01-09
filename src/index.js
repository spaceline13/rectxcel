import React from 'react';
import ReactDOM from 'react-dom';
import {configure} from "mobx";
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
configure({enforceActions: 'observed'});
console.log(React.version,'rfedrtewt ');
ReactDOM.render(<App/>, document.getElementById('root'));

registerServiceWorker();
