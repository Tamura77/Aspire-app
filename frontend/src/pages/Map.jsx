import {useQuery} from "@tanstack/react-query";
import { fetchExample } from "../requests/example";
import React, {useState} from "react"
import map from "../assets/images/map.json"
import { useNavigate } from "react-router-dom";
import {BrowserRouter as Router, Link} from "react-router-dom";
import AspireNavbar from "../components/navbar";

import {
ComposableMap,
Geographies,
Geography,
Marker,
Annotation,
ZoomableGroup,
} from "react-simple-maps";

import ReactTooltip from "react-tooltip";

const markers = [
  {
    markerOffset: -15,
    name: "Example 1",
    coordinates: [-58.3816, -34.6037],
  },
  {
    markerOffset: -15,
    name: "Example 2",
    coordinates: [144.963058, -37.813629],
  },
  {
    markerOffset: -15,
    name: "Example 3",
    coordinates: [-122.419418,37.774929],
  },
];
const geoUrl= map;

function Map() {
  const navigate = useNavigate();
    return (
      <div className="mappage">
        <h1>Campus Map</h1>
        <div className="campusmap">
        <ComposableMap data-tip="">
          <ZoomableGroup zoom ={1}>
            <Geographies geography={geoUrl}>
                {({ geographies })=>
                geographies.map((geo) =>(
                    <Geography key={geo.rsmKey} geography={geo}/>
                ))
                }
            </Geographies>
            {
              markers.map(({name, coordinates, markerOffset}) =>(
                <Marker key={name} coordinates={coordinates}>
                  <circle r={5} fill="#F10" stroke="#fff" strokeWidth={1}/>
                  <text className="markers" y={markerOffset}>
                    {name}
                  </text>
                </Marker>
              ))
            }
            <Annotation subject={[-58.3816, -34.6037]}
            dx={2.42*(144.963058+58.3816)}
            dy={3.42*(37.813629-34.6037)}
            connectorProps={{
              stroke:"#FF5933",
              strokeWidth:3,
              strokLinecap: "round",
            }}>

            </Annotation>
            </ZoomableGroup>
        </ComposableMap>
        <AspireNavbar />
        </div>
      </div>
    );
  }
  
  export default Map