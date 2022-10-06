import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

//Pages 
import Map from './pages/Map'
import TeamLogin from './pages/TeamLogin';
import Race from './pages/Race';
import ExternalLinks from './pages/ExternalLinks';
import Help from './pages/Help';
import PageNotFound from './pages/PageNotFound';
import Adminpage from './pages/Adminpage';
import AdminTasks from './pages/AdminTasks';
import AdminPlaces from './pages/AdminPlaces';
import AdminTables from './pages/AdminTables';
import AdminRaces from './pages/AdminRaces';
import AdminHelp from './pages/AdminHelp';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Map/>} />
        <Route path="Race" element={<Race/>} />
        <Route path="ExternalLinks" element={<ExternalLinks/>} />
        <Route path="TeamLogin" element={<TeamLogin/>}/>
        <Route path="Help" element={<Help/>}/>
        <Route path="Adminpage" element={<Adminpage/>}/>
        <Route path="AdminPlaces" element={<AdminPlaces/>}/>
        <Route path="AdminRaces" element={<AdminRaces/>}/>
        <Route path="AdminTables" element={<AdminTables/>}/>
        <Route path="AdminHelp" element={<AdminHelp/>}/>
        <Route path="AdminTasks" element={<AdminTasks/>}/>
        <Route path="*" element={<PageNotFound />} />
        {/* normally all lowercase and "-" inbetween words */}
        {/* admin pages should be "admin/places" or "admin/page", for the password checking */}
      </Routes>
    </div>
  );
}

export default App;
