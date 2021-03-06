import React from 'react';
import ReactDOM from 'react-dom';
import App from "./js/components/App/App.js";

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<App />, wrapper) : false;