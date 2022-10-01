import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

//Pages 
import Home from './pages/Home';
import ExternalLinks from './pages/ExternalLinks';
import Map from './pages/Map';
import Help from './pages/Help';
import PageNotFound from './pages/PageNotFound';
import Admin from './pages/Admin';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="ExternalLinks" element={<ExternalLinks/>} />
        <Route path="Map" element={<Map/>}/>
        <Route path="Help" element={<Help/>}/>
        <Route path="*" element={<PageNotFound />} />
        <Route path="Admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
