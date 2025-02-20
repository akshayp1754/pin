import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {Provider} from 'react-redux';
import store from './redux/store';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const id = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;
root.render(
  <GoogleOAuthProvider clientId={id}>
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
  </GoogleOAuthProvider>
);
