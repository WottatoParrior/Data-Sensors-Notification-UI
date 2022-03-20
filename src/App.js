import logo from './index.png';
import './App.css';
import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

function App() {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    // Update the document title using the browser API
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification');
    } else {
      Notification.requestPermission();
    }
    // setTimeout(showNotificationScreenNotVisible, 5000);
    // setTimeout(showNotificationSoundIsNotGood, 10000);
    // setTimeout(showNotificationClarifications, 20000);

    if (!socket) {
      const socketNew = socketIOClient('http://127.0.0.1:9001/');
      socketNew.on('report_received', (data) => {
        showNotification(data.body);
      });
      setSocket(socketNew);
    }
  }, [socket]);

  function showNotification(body) {
    const options = {
      body,
      icon: logo,
      silent: true,
      dir: 'ltr',
    };
    new Notification('Issue', options);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hybrid Learning Services</p>
      </header>
    </div>
  );
}

export default App;
