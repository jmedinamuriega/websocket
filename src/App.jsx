// src/App.js
import React, { useEffect, useState } from 'react';
import socket from './utilities/websocket';
import DataChart from './components/DataChart';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [view, setView] = useState('default');

  useEffect(() => {
    if (!isPaused) {
      socket.on('data', (newData) => {
        setData((prevData) => [...prevData, newData]);
        setLoading(false);
      });
    }

    return () => {
      socket.off('data');
    };
  }, [isPaused]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  return (
    <div className="App">
      <h1>Real-Time Data Visualization</h1>
      <button onClick={() => setIsPaused(!isPaused)}>
        {isPaused ? 'Resume' : 'Pause'}
      </button>
      <select onChange={handleViewChange} value={view}>
        <option value="default">Default View</option>
        <option value="custom1">Custom View 1</option>
        <option value="custom2">Custom View 2</option>
      </select>
      <DataChart data={data} view={view} />
    </div>
  );
}

export default App;
