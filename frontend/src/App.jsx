import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

//Pages 
import Landing from './pages/Landing'
import Race from './pages/Race';
import ExternalLinks from './pages/ExternalLinks';
import Map from './pages/Map';
import Help from './pages/Help';
import PageNotFound from './pages/PageNotFound';
import Adminpage from './pages/Adminpage';
import Tasks from './pages/Tasks';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="Race" element={<Race/>} />
        <Route path="ExternalLinks" element={<ExternalLinks/>} />
        <Route path="Map" element={<Map/>}/>
        <Route path="Help" element={<Help/>}/>
        <Route path="Adminpage" element={<Adminpage/>}/>
        <Route path="Tasks" element={<Tasks/>}/>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
