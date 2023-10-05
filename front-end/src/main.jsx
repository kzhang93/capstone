// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // 这里是你原来的主应用组件
import Header from './Header'; // 导入 Header 组件

ReactDOM.render(
  <React.StrictMode>
    <Header /> {/* 渲染 Header */}
    <App /> {/* 渲染原来的主应用组件 */}
  </React.StrictMode>,
  document.getElementById('root')
);
