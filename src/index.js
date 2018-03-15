import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Layout from './App';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(<Layout />, document.getElementById('root'));


registerServiceWorker();
