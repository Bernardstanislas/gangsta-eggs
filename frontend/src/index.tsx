import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import * as FullStory from '@fullstory/browser';
import {Symfoni} from './hardhat/SymfoniContext';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

FullStory.init({orgId: '169KHR'});

ReactDOM.render(
  <BrowserRouter>
    <Symfoni autoInit={false} showLoading={false}>
      <App />
    </Symfoni>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </BrowserRouter>,
  document.getElementById('root')
);
