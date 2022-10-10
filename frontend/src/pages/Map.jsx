import React, { useState, useEffect } from 'react';
import {useQuery} from "@tanstack/react-query";
import { fetchExample } from "../requests/example";
import { useNavigate } from "react-router-dom";
import {BrowserRouter as Router, Link} from "react-router-dom";
import axios from 'axios';

import HelpButton from "../components/helpButton";
import AspireNavbar from "../components/navbar";
import AspireInfoPopup from "../components/infoPopup";
import ReactTooltip from "react-tooltip";
import "./styling/Map.css";

import map from "../assets/images/campusmap.svg";

import {
ComposableMap,
Geographies,
Geography,
Marker,
Annotation,
ZoomableGroup,
} from "react-simple-maps";

//Main map

function Map() {
  const [modalShow, setModalShow] = React.useState(false);
  var [infoName, setInfoName] = useState("");
  var [infoDesc, setInfoDesc] = useState("");
  const [markers, setMarkers] = useState(JSON.parse(localStorage.getItem("infomarkers")));
  const navigate = useNavigate();

  const MarkersList = 
    markers.map(({name, coordinates, description}) =>(
      <Marker 
        onClick={
          function(e){
            setInfoName(name);
            setInfoDesc(description);
            setModalShow(true);
          }
        } 
        key={name} coordinates={coordinates.split(",").map(Number)}>
        <circle r={10} fill="#FFA500" stroke="#fff" strokeWidth={1}/>
        <text className="markers" y={-20}>
          {""}
        </text>
      </Marker>

    ));

  return (
    <div className="mappage">
    <img src={map} alt="campus map"></img>
    <div className="campusmap">
    <ComposableMap projection="geoMercator" projectionConfig={{scale: 130}} width={793} height={1269}> 
      {MarkersList}
    </ComposableMap>
    <AspireNavbar />
    <HelpButton />
    <AspireInfoPopup
      name={infoName}
      description={infoDesc}
      show={modalShow}
      onHide={() => setModalShow(false)} 
    />
    </div>
  </div>
  );
}
export default Map
