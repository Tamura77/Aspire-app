import {useQuery} from "@tanstack/react-query";
import { fetchExample } from "../requests/example";
import React, {useState} from "react"
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

// set of markers rendered

const markers = [];

//Dummy data base of markers

const markersDB = [
  {
    markerOffset: -15,
    name: "Example 1",
    coordinates: [-58.3816, -34.6037],
    online: true,
    info: "tall building"
  },
  {
    markerOffset: -15,
    name: "Example 2",
    coordinates: [144.963058, -37.813629],
    online: true,
    info: "small building"
  },
  {
    markerOffset: -15,
    name: "Example 3",
    coordinates: [-122.419418,37.774929],
    online: true,
    info: "tall building"
  },
  {
    markerOffset: -15,
    name: "example 4",
    coordinates: [0,0],
    online: false,
    info: "tall building"
  },
];

//Filters out offline buildings

for (var i = 0; i < markersDB.length; i++){
  if (markersDB[i].online){
    markers.push(markersDB[i]);
  }
}

//Popupfunction

function popup(name, info){
  alert(name +info);
}

//Main map

function Map() {

  const navigate = useNavigate();
    return (
      <div className="mappage">
        <img src={map} alt="campus map"></img>
        <div className="campusmap">
        <ComposableMap data-tip="">
            {
              markers.map(({name, coordinates, markerOffset, info}) =>(
                <Marker onClick={() => popup(name, info)}key={name} coordinates={coordinates}>
                  <circle r={5} fill="#F10" stroke="#fff" strokeWidth={1}/>
                  <text className="markers" y={markerOffset}>
                    {name}
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
  
  export default Map