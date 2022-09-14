import {useQuery} from "@tanstack/react-query";
import { fetchExample } from "../requests/example";
import { useNavigate } from "react-router-dom";
import {BrowserRouter as Router, Link} from "react-router-dom";

import AspireNavbar from "../components/navbar";


function Home() {
    const {data, error, isError, isLoading} = useQuery(["example"], fetchExample);
    const navigate = useNavigate();
    return (
        <div className="home">
            <h1>{isLoading ? "Loading..." : data.title}</h1>
            <AspireNavbar />
        </div>
    )
}

export default Home;
