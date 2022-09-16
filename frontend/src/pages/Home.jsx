import {useQuery} from "@tanstack/react-query";
import { fetchExample } from "../requests/example";
import { useNavigate } from "react-router-dom";
import {BrowserRouter as Router, Link} from "react-router-dom";

import AspireNavbar from "../components/navbar";

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
        name: "Building 1",
        coordinates: [-58.3816, -34.6037],
        online: true,
        info: "tall building",
        number: 0,
        colour: "#008000"
      },
      {
        name: "Building 6",
        coordinates: [144.963058, -37.813629],
        online: true,
        info: "small building",
        colour: "#FF0000"
      },
      {
        name: "Building 4",
        coordinates: [-122.419418,37.774929],
        online: true,
        info: "tall building",
        colour: "#FF0000"
      },
      {
        name: "Building 2",
        coordinates: [0,0],
        online: true,
        info: "tall building",
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
        alert("colour" + markers[number].colour);
        markers[number].colour = "#008000";
      }
    

function Home() {
    const {data, error, isError, isLoading} = useQuery(["example"], fetchExample);
    const navigate = useNavigate();
    return (

    <div className="mappage">
      <img src={map} alt="campus map"></img>
      <div className="campusmap" key = {Math.random() + Date.now()}>
      <ComposableMap projection = "geoMercator" projectionConfig={{scale: 130}} width="793" height="1269" >
          {
            markers.map(({name, coordinates, info, number, colour}) =>(
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
      </div>
    </div>
  );
}
    

export default Home;
