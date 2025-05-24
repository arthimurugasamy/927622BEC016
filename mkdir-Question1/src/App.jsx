import React, { useState } from 'react';
import './App.css';

function App() {
  const [numberType, setNumberType] = useState('p');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

 const fetchNumbers = async () => {
  setLoading(true);
  try {
    const res = await fetch(`http://localhost:9876/numbers/${numberType}`);
    const data = await res.json();
    setResult(data);
  } catch (err) {
    console.error("Failed to fetch:", err);
    setResult({ error: "Fetch error" });
  }
  setLoading(false);
};


  return (
    <div className="App">
      <h1>Average Calculator</h1>

      <select value={numberType} onChange={(e) => setNumberType(e.target.value)}>
        <option value="p">Prime</option>
        <option value="f">Fibonacci</option>
        <option value="e">Even</option>
        <option value="r">Random</option>
      </select>

      <button onClick={fetchNumbers} disabled={loading}>
        {loading ? "Loading..." : "Fetch Number"}
      </button>

      {result && (
        <div className="result">
          <h3>Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
