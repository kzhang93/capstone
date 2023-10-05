import React from 'react';
import Topics from './Topics';
import Dashboard from './Dashboard';  // 新添加的组件


function App() {
  const bgStyle = {
     backgroundColor: 'pink',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  };

  return (
    <div style={bgStyle}>
      <main>
        <Topics />
        <Dashboard />

      </main>
    </div>
  );
}


export default App;