import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [networkStats, setNetworkStats] = useState({
    nodes: [],
    links: []
  });

  // Fetch the network stats every second
  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('http://localhost:3500/network-stats')
        .then(response => setNetworkStats(response.data))
        .catch(error => console.error("Error fetching network stats:", error));
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="App">
      <h1>Network Traffic Simulation</h1>
      <h2>Node Statistics</h2>
      <table>
        <thead>
          <tr>
            <th>Node</th>
            <th>Packets Generated</th>
            <th>Queue Length</th>
          </tr>
        </thead>
        <tbody>
          {networkStats.nodes.map(node => (
            <tr key={node.id}>
              <td>{node.id}</td>
              <td>{node.packetsGenerated}</td>
              <td>{node.queueLength}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Link Utilization</h2>
      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Load</th>
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>
          {networkStats.links.map(link => (
            <tr key={`${link.from}-${link.to}`}>
              <td>{link.from}</td>
              <td>{link.to}</td>
              <td>{link.load}</td>
              <td>{link.capacity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
