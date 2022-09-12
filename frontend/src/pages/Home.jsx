import map1 from "../assets/images/campusmap.jpg";
import race from "../assets/images/race.png";
import tasks from "../assets/images/tasks.png";
import map2 from "../assets/images/map.png";
import links from "../assets/images/links.png";


function Home() {
    return (
        <div>
            <h1>A</h1>
            <div className='modes'>
                <img src={race} className="race-button" alt="race" />
                <img src={tasks} className="tasks-button" alt="tasks" />
                <img src={map2} className="map-button" alt="map2" />
                <img src={links} className="links-button" alt="links" />
            </div>
        </div>
    )
}

export default Home;