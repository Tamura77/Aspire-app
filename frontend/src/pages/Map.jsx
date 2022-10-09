import React, { useState, useEffect } from 'react';
import {useQuery} from "@tanstack/react-query";
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
  const [markers, setMarkers] = useState("");
  const navigate = useNavigate();

  const fetchInfo = async () => {
    const info = await axios.get("http://localhost:5000/places");
    localStorage.setItem("infomarkers", JSON.stringify(info.data));
    setMarkers(
      JSON.parse(localStorage.getItem("infomarkers")).map(({name, coordinates, description}) =>(
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
      ))
    )
  }
  
  useEffect(() => {
    fetchInfo();
  }, [])

  if (markers === ""){
    return <div>loading...</div>
  }

  return (
    <div className="mappage">
    <img src={map} alt="campus map"></img>
    <div className="campusmap">
    <ComposableMap projection="geoMercator" projectionConfig={{scale: 130}} width={793} height={1269}> 
      {markers}
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
