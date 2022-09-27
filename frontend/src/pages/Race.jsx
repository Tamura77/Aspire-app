import React, { useState, useEffect} from 'react';
import {useQuery} from "@tanstack/react-query";
import { fetchExample } from "../requests/example";
import { useNavigate } from "react-router-dom";
import {BrowserRouter as Router, Link} from "react-router-dom";
import axios from 'axios';

import AspireNavbar from "../components/navbar";
import HelpButton from "../components/helpButton";
import AspireRacePopup from "../components/racePopup";

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
  const {data, error, isError, isLoading} = useQuery(["example"], fetchExample);
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  
  // States of markers
  const [markers, setMarkers] = useState(JSON.parse(localStorage.getItem("racemarkers")));
  // const [markersList, setMarkersList] = useState("");
  
  // name and description for popup with method to update values
  const [raceName, setRaceName] = useState("");
  const [raceTask, setRaceTask] = useState("");
  const [raceAnswer, setRaceAnswer] = useState("");
  // removed answer and setRaceAnswer

  const MarkersList = 
    markers.map(({name, coordinates, description, number, colour}) =>(
      <Marker 
        onClick={function(e){
          setRaceName(name);
          setRaceTask(description);
          setModalShow(true);
          }
        }
        key={name}
        coordinates={coordinates.split(",").map(Number)}
        updateMarkerColour = {updateMarkerAnswer}
        >
          <circle r={15} fill={colour} stroke="#fff" strokeWidth={1}/>
          <text className="markers" y={5}>
            {number}
          </text>
      </Marker>
    ));

  // removed "newAnswer" in parameters and ", answer: newAnswer" in return
  function updateMarkerAnswer(id){
    var updatedMarkers = markers.map((marker) => {
      if (marker.name == id){
        return {...marker, colour: "#2D932B"}
      }
      return marker;
    });
    localStorage.setItem("racemarkers", JSON.stringify(updatedMarkers));
    setMarkers(updatedMarkers);
  }
    
  return (
    <div className="mappage">
      <img src={map} alt="campus map"></img>
      <div className="campusmap" key = {Math.random() + Date.now()}>
      <ComposableMap projection = "geoMercator" projectionConfig={{scale: 130}} width={793} height={1269} >
          {MarkersList}
      </ComposableMap>
      <AspireNavbar />
      <HelpButton />
      <AspireRacePopup
        name = {raceName}
        task = {raceTask}
        updateMarkerAnswer = {updateMarkerAnswer}
        show = {modalShow}
        answer = {raceAnswer}
        onHide={() => setModalShow(false)}
      />
      </div>
    </div>
  );
}

export default Race;
