import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import TestApp from './TestApp.js'
import UserContextProvider from './context/userContext.js'
import OtherUserContextProvider from './context/OtherUserContext.js'
import PageContextProvider from './context/PageContext.js'


ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
  <OtherUserContextProvider>
  <UserContextProvider>
  <PageContextProvider>
    <App/>
  </PageContextProvider>
  </UserContextProvider>
  </OtherUserContextProvider>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
