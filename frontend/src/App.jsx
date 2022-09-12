import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';

//Pages 
import Home from './pages/Home';
import About from './pages/About';
import PageNotFound from './pages/PageNotFound';

function App() {

  const [title, setTile] = useState("")

  useEffect(() => {
    fetch("/api").then(res => res.json()).then(data => setTile(data.title))
  }, [])

  return (
    <div className="App">
      <h1>Test</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
