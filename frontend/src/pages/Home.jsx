import React, { useState } from 'react';
import {useQuery} from "@tanstack/react-query";
import { getMapData } from "../requests/example";
import { useNavigate } from "react-router-dom";
import {BrowserRouter as Router, Link} from "react-router-dom";

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
    
//markers to be rendered
const markersBuffer = [];

//Dummy data base of markers
// Max coordinates are [180,-89]

const markersDB = [
  {
    name: "Arts Building",
    coordinates: [-20, 78.5],
    online: true,
    task: "How many peacocks and peahens live on campus?",
    colour: "#FF0000",
    number: 0,
  },
  {
    name: "University Club of Western Australia",
    coordinates: [10, 78.5],
    online: true,
    task: "Which Academy-Award winning artist (and UWA graduate) created the 'Hours to Sunset' sundial on the wall of University Club? What did they win their award for? (2 points)",
    colour: "#FF0000"
  },
  {
    name: "Reid Library",
    coordinates: [-62,71],
    online: true,
    task: "How many floors does the Reid Library have?",
    colour: "#FF0000"
  },
  {
    name: "Guild Village",
    coordinates: [8,10],
    online: true,
    task: "Name two of the shops located in the guild village.",
    colour: "#FF0000"
  },
  {
    name: "Bilya Marlee",
    coordinates: [48,-68],
    online: true,
    task: "Who created the artwork, “Danjoo Kaartdijin”, located in the front entrance of the Bilya Marlee building? What was the artwork a metaphor for? (2 points)",
    colour: "#FF0000"
  },
  {
    name: "Barry J Marshall Library",
    coordinates: [-30,-65],
    online: true,
    task: "The Science Library is named after Barry J Marshall. What year did he receive his Nobel Prize? What was it for? (2 points)",
    colour: "#FF0000"
  },
  {
    name: "Bayliss Building",
    coordinates: [-32,-35],
    online: true,
    task: "Take a photo of the ground floor tiling in the central atrium of the Bayliss building. Describe the 'Penrose' pattern. (Hint - it uses symmetry)",
    colour: "#FF0000"
  },
  {
    name: "Irwin Street Building",
    coordinates: [-100,50],
    online: true,
    task: "What is special about the Irwin Street Building (the white building next to James Oval)?",
    colour: "#FF0000"
  },
  {
    name: "EZONE",
    coordinates: [-130,50],
    online: true,
    task: "Each room in the new Ezone building is named using Indigenous words. What is the word for the EMS Student Office?",
    colour: "#FF0000"
  },
  {
    name: "Physics building",
    coordinates: [-102,77],
    online: true,
    task: "What city is the statue in the foyer of the Physics building from?",
    colour: "#FF0000"
  },
  
  
];

//Filters out offline buildings

for (var i = 0; i < markersDB.length; i++){
  if (markersDB[i].online){
    markersDB[i].number = i+1;
    markersBuffer.push(markersDB[i]);
  }
}



function Home() {
  const {data, error, isError, isLoading} = useQuery(["example"], getMapData);
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  
  // name and description for popup with method to update values
  var [raceName, setRaceName] = useState("");
  var [raceTask, setRaceTask] = useState("");
  var [raceColour, setRaceColour] = useState("");
  
  // States of markers
  var [markers, setMarkers] = useState(markersBuffer);

  const markersList = markers.map(({name, coordinates, task, number, colour}) =>(
    <Marker 
      onClick={function(e){
        setRaceName(name);
        setRaceTask(task);
        setRaceColour(colour);
        setModalShow(true);
        }
      }
      key={name}
      coordinates={coordinates}
      allMarkers = {markers}
      updateMarker = {setMarkers}
      >
        <circle r={15} fill={raceColour} stroke="#fff" strokeWidth={1}/>
        <text className="markers" y={5}>
          {number}
        </text>
    </Marker>
  ))
    
    return (

    <div className="mappage">
      <img src={map} alt="campus map"></img>
      <div className="campusmap" key = {Math.random() + Date.now()}>
      <ComposableMap projection = "geoMercator" projectionConfig={{scale: 130}} width={793} height={1269} >
          {markersList}
      </ComposableMap>
      <AspireNavbar />
      <HelpButton />
      <AspireRacePopup
        name = {raceName}
        task = {raceTask}
        colour = {raceColour}
        updateColour = {() => setRaceColour("#00FF00")}
        show = {modalShow}
        onHide={() => setModalShow(false)}
      />
      </div>
    </div>
  );
}
    

export default Home;
