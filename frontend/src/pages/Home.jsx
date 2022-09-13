import {useQuery} from "@tanstack/react-query";
import { fetchExample } from "../requests/example";
import { useNavigate } from "react-router-dom"
import {BrowserRouter as Router, Link} from "react-router-dom"

import map1 from "../assets/images/campusmap.jpg";
import race from "../assets/images/race.png";
import tasks from "../assets/images/tasks.png";
import map2 from "../assets/images/map.png";
import links from "../assets/images/links.png";



function Home() {
    const {data, error, isError, isLoading} = useQuery(["example"], fetchExample);
    const navigate = useNavigate();
    return (
        <div className="home">
            <h1>{isLoading ? "Loading..." : data.title}</h1>
            <div className='modes'>
                <Link to="/PageNotFound">
                <img src={race} className="race-button" alt="race" />
                </Link>
                <Link to="/PageNotFound">
                <img src={tasks} className="tasks-button" alt="tasks" />
                </Link>
                <Link to="Map">
                <img src={map2} className="map-button" alt="map2" />
                </Link>
                <Link to="/PageNotFound">
                <img src={links} className="links-button" alt="links" />
                </Link>
                <button onClick={() => {navigate("About");}}
                >Go to About</button>
            </div>
        </div>
    )
}

export default Home;