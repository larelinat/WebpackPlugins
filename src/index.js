import './main.scss'
import './fonts/fonts.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app'

function component(text) {
    const element = document.createElement('h1');
    element.textContent = text + "hello" + "world";
    return element;
}

document.body.prepend(component('Hello World'));

ReactDOM.render(<App />, document.getElementById('root'));