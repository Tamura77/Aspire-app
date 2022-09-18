import {useQuery} from "@tanstack/react-query";
import { fetchExample } from "../requests/example";
import { useNavigate } from "react-router-dom";
import {BrowserRouter as Router, Link} from "react-router-dom";

import AspireNavbar from "../components/navbar";
import HelpButton from "../components/helpButton";

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
    const markers = [];
    
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
        markers.push(markersDB[i]);
      }
    }
    
    //Popupfunction
    
    function popup(name, info){
      alert(name +info);
    }

    function done(number){
        alert(markers[number-1].task);
        markers[number].colour = "#008000";
      }
    

function Home() {
    const {data, error, isError, isLoading} = useQuery(["example"], fetchExample);
    const navigate = useNavigate();
    return (

    <div className="mappage">
      <img src={map} alt="campus map"></img>
      <div className="campusmap" key = {Math.random() + Date.now()}>
      <ComposableMap projection = "geoMercator" projectionConfig={{scale: 130}} width={793} height={1269} >
          {
            markers.map(({name, coordinates, task, number, colour}) =>(
              <Marker onClick={() => done(number)}key={name} coordinates={coordinates}>
                <circle r={15} fill={colour} stroke="#fff" strokeWidth={1}/>
                <text className="markers" y={5}>
                  {number}
                </text>
              </Marker>
            ))
          }
      </ComposableMap>
      <AspireNavbar />
      <HelpButton />
      </div>
    </div>
  );
}
    

export default Home;
