import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';

//Pages 
import Home from './pages/Home';
import About from './pages/About';
import Map from './pages/Map';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="About" element={<About />} />
        <Route path="Map" element={<Map/>}/>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
