import React, { useState, useEffect} from 'react';
import {useQuery} from "@tanstack/react-query";
import { fetchExample } from "../requests/example";
import { useNavigate } from "react-router-dom";
import {BrowserRouter as Router, Link} from "react-router-dom";
import axios from 'axios';
import Form from 'react-bootstrap/Form';

import "./styling/Landing.css";

function Landing() {

    // raceCode = raceID + teamID
    // e.g., 1AB = race 1 team 1
    //       3CD = race 3 team 2
    const [raceCode, setRaceCode] = useState("");
    const [disable, setDisable] = useState(true);
    
    const fetchInfoMarkers = async () => {
        const {data} = await axios.get("http://localhost:5000/places");
        localStorage.setItem("infomarkers1", JSON.stringify(data));
    }
    const fetchRace = async () => {
        let raceID = raceCode.substring(0,raceCode.length-2);
        let teamID = raceCode.substringsubstring(raceCode.length-2, raceCode.length);

        // set team number
        console.log(teamID);
        const num1 = teamID.charCodeAt(0) - 97;
        const num2 = teamID.charCodeAt(1) - 97;
        let teamNo = (num1 + num2 - 1)/4;
        console.log(teamNo);

        // fetch Race based on raceID
        // need to query database here
        const {data} = await axios.get("http://localhost:5000/tasks");

        // check if there are errors 

        // Set order of race
        let buffer = data;
        for (var i = 1; i <= buffer.length; i++){
            if (teamNo == buffer.length){
                teamNo = 0;
            }
            buffer[teamNo].number = i;
            teamNo++;
        }


        localStorage.setItem("racemarkers1", JSON.stringify(data));

        setDisable(false);

    }

    useEffect(() => {
        console.log("useEffect hook called");
        fetchInfoMarkers();
    }, [])

    
    return(
        <div className="landingDiv">
             <Form className="landingForm">
                <div className="landingFormContent">
                    <h1 className="landingFormTitle">Team Log In</h1>
                    <div className="form-group mt-3">
                        <label>Race Code</label>
                        <input
                        type="text"
                            value={raceCode}
                            onChange={(e) => setRaceCode(e.target.value)}
                            className="form-control mt-1"
                            placeholder="Enter race code"
                        />
                        <p>{raceCode}</p>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="button" className="btn btn-primary" onClick={fetchRace}>
                            Check
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={disable} href="/Map">
                            Submit
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default Landing;