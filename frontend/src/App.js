
import './App.css';
import map1 from "./images/campusmap.jpg";
import race from "./images/race.png";
import tasks from "./images/tasks.png";
import map2 from "./images/map.png";
import links from "./images/links.png";

function App() {
  return (
    <div className="App">

      <div className='modes'>

      <img src={race} className="race-button" alt="race"/>
      <img src={tasks} className="tasks-button" alt="tasks"/>
      <img src={map2} className="map-button" alt="map2"/>
      <img src={links} className="links-button" alt="links"/>
      </div>
    </div>
  );
}

export default App;
