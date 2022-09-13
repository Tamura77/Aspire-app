import {useQuery} from "@tanstack/react-query";
import { fetchExample } from "../requests/example";
import React, {useState} from "react"

import {
ComposableMap,
Geographies,
Geography,
Marker,
Annotation,
ZoomableGroup,
} from "react-simple-maps";

import ReactTooltip from "react-tooltip";

function Map() {
    return (
      <div className="mappage">
        <h1>Campus Map</h1>
        <div className="campusmap">

        </div>
      </div>
    )
  }
  
  export default Map