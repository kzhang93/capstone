// index.js 
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // 导入你的 App 组件
import './i18n'; // Import i18n configuration

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
