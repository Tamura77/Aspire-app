import React, { useState, useEffect} from 'react';
import {useQuery} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {BrowserRouter as Router, Link} from "react-router-dom";
import axios from 'axios';

import AspireNavbar from "../components/navbar";
import HelpButton from "../components/helpButton";
import AspireRacePopup from "../components/racePopup";
import RaceSubmitButton from '../components/raceSubmitButton';
import RaceForfeitButton from '../components/raceForfeitButton';

import map from "../assets/images/campusmap.svg"

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
  ZoomableGroup,
  } from "react-simple-maps";
    
import ReactTooltip from "react-tooltip";


function Race() {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [submitShow, setSubmitShow] = useState(false);
  const [forfeitShow, setForfeitShow] = useState(true);
  
  // States of markers
  const [markers, setMarkers] = useState(JSON.parse(localStorage.getItem("racemarkers")));
  
  // name and description for popup with method to update values
  const [raceName, setRaceName] = useState("");
  const [raceTask, setRaceTask] = useState("");

  const MarkersList = 
    markers.map(({name, coordinates, description, number, colour}) =>(
      <Marker 
        onClick={function(e){
            var answers = JSON.parse(localStorage.getItem("raceanswers"));
            if (answers == null && parseInt(number) === 1){
              setRaceName(name);
              setRaceTask(description);
              setModalShow(true);
            }
            else if (answers == null){
              alert("Finish current task first!")
            }
            else if (answers.length >= number-1){
              setRaceName(name);
              setRaceTask(description);
              setModalShow(true);
            }
            else{
              alert("Finish current task first!")
            } 
          }
        }
        number={number}
        key={name}
        coordinates={coordinates.split(",").map(Number)}
        >
          <circle r={15} fill={colour} stroke="#fff" strokeWidth={1}/>
          <text className="markers" y={5}>
            {number}
          </text>
      </Marker>
    ));

  // removed "newAnswer" in parameters and ", answer: newAnswer" in return
  function updateMarkerAnswer(id, answer){
    if (localStorage.getItem("raceanswers") === null){
      localStorage.setItem("raceanswers", JSON.stringify([{id : id, answer: answer}]))
    }
    else{
      var answers = JSON.parse(localStorage.getItem("raceanswers"));
      const i = answers.findIndex(e => e.id === id);
      if (i > -1) {
        // if same question has been answered before
        answers[i] = {id : id, answer: answer}
      }
      else{
        answers.push({id : id, answer: answer})
      }
      localStorage.setItem("raceanswers", JSON.stringify(answers));
    }

    var updatedMarkers = markers.map((marker) => {
      if (marker.name == id){ 
        // Show Submit Button on Last Submission
        if (parseInt(marker.number) === markers.length){
          setForfeitShow(false)
          localStorage.setItem("finish", "true");
          setSubmitShow(true)
        }

        // Change Marker Colour
        return {...marker, colour: "#2D932B"}
      }
      return marker;
    });

    localStorage.setItem("racemarkers", JSON.stringify(updatedMarkers));
    setMarkers(updatedMarkers);
  }

  useEffect(() => {
    if (localStorage.getItem("finish") === "true") {
      setForfeitShow(false);
      setSubmitShow(true);
    }
}, [])

  return (
    <div className="mappage">
      <img src={map} alt="campus map"></img>
      <div className="campusmap" key = {Math.random() + Date.now()}>
      <ComposableMap projection = "geoMercator" projectionConfig={{scale: 130}} width={793} height={1269} >
          {MarkersList}
      </ComposableMap>
      <AspireNavbar />
      <HelpButton />
      <RaceSubmitButton
        show = {submitShow}
      />
      <RaceForfeitButton
        show = {forfeitShow}
      />
      <AspireRacePopup
        name = {raceName}
        task = {raceTask}
        updateMarkerAnswer = {updateMarkerAnswer}
        show = {modalShow}
        onHide={() => setModalShow(false)}
      />
      </div>
    </div>
  );
}

export default Race;
