import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';
import './i18n';
import reportWebVitals from './reportWebVitals';

const mount = (el: HTMLElement) => {
    const root = createRoot(el);
    root.render(<React.StrictMode>
        <App />
      </React.StrictMode>);
  };

if (process.env.NODE_ENV === "development") {
    const rootNode = document.getElementById("root");
    if (rootNode) {
        mount(rootNode);
    }
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

class EmployeeAppReact extends HTMLElement {
    connectedCallback() {
        mount(this);
    }
}
  
customElements.define('employee-app-react', EmployeeAppReact);