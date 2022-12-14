import React, { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Form from 'react-bootstrap/Form';

import "./styling/TeamLogin.css";

function TeamLogin() {

    const [raceCode, setRaceCode] = useState("");
    const [disable, setDisable] = useState(true);
    const [correct, setCorrect] = useState("");
    const navigate = useNavigate();

    // Change to map page on submit
    const routeChange = () =>{ 
        let path = `/Race`; 
        navigate(path);
    }
    
    const fetchInfo = async () => {
        const info = await axios.get("http://localhost:5000/places");
        localStorage.setItem("infomarkers", JSON.stringify(info.data));
    }
    
    //
    const fetchRace = async () => {
        // raceCode = raceID + teamID
        // e.g., 1ab = race 1 team 1
        //       3cd = race 3 team 2
        let raceID = raceCode.substring(0,raceCode.length-2);
        let teamID = raceCode.substring(raceCode.length-2, raceCode.length);
        
        // set team number
        console.log(teamID);
        const num1 = teamID.charCodeAt(0) - 97;
        const num2 = teamID.charCodeAt(1) - 97;
        let teamNo = (num1 + num2 - 1)/4;
        console.log(teamNo);

        // fetch Race based on raceID
        // need to query database here
        const race = await axios.get("http://localhost:5000/races/" + raceID); 
        console.log(race);

        // Check if there are errors 
        if (race.status !== 200 || race.data.length == 0){
            console.log("bad raceID");
            setCorrect("Incorrect Race Code")
            return null;
        }
        setCorrect("Correct")

        // Set order of race based on teamID
        let buffer = race.data;
        for (var i = 1; i <= buffer.length; i++){
            if (teamNo == buffer.length){
                teamNo = 0;
            }
            buffer[teamNo].number = i;
            teamNo++;
        }

        localStorage.setItem("racemarkers", JSON.stringify(buffer));

        setDisable(false);

    }

    useEffect(() => {
        fetchInfo();
    }, [])

    
    return(
        <div className="TeamLoginDiv">
             <Form className="TeamLoginForm">
                <div className="TeamLoginFormContent">
                    <h1 className="TeamLoginFormTitle">Team Log In</h1>
                    <div className="form-group mt-3">
                        <label>Race Code</label>
                        <input
                        type="text"
                            value={raceCode}
                            onChange={(e) => setRaceCode(e.target.value)}
                            className="form-control mt-1"
                            placeholder="Enter race code (case sensitive)"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        {correct}
                        <button type="button" className="btn btn-primary" onClick={fetchRace}>
                            Check
                        </button>
                        <button type="button" className="btn btn-primary" disabled={disable} onClick={routeChange}>
                            Submit
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default TeamLogin;