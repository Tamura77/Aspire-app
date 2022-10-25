import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { verifyLogin } from "../utils/verifyLogin";
import axios from "axios"

//Components
import Sidebar from "../components/sidebar";

//icons
import {BsFillCircleFill} from "react-icons/bs"
//Styling
import "./styling/AdminSide.css"
import "../components/sidebar.css"

import logo from "../assets/images/uwa.svg";

//map SVG file
import map from "../assets/images/campusmap.svg";
import map1 from "../assets/images/campus(top).png";
import map2 from "../assets/images/campus(bot).png";

//Variables
const state ={
  xoffset: 0,
  yoffset: 0,
  xcoord: 0,
  ycoord: 0,
  delta: 0,
  opacity: 0.0,
  button: "Down",
};


function AdminPlaces () {

  useEffect(verifyLogin(useNavigate()), []);

  const [coord, setCoord] = useState([])
  const handleMouseMove = (event) =>{
    let coordinates = [event.clientX, event.clientY]
    setCoord(coordinates)
  }

  //store coordinates function
  const store = event =>{
     state.xoffset = coord[0] -17; 
     state.yoffset = coord[1] -28; 
     state.opacity = 1;
     if (state.button=="Up"){
      state.ycoord = (1.0422*((state.yoffset+525 ))).toFixed(1);   //second map so add 866px down from top map, -11 is calibration (WIP)
     }
     else{
      state.ycoord = (1.0422*((state.yoffset -87))).toFixed(1);
     }
     state.xcoord = (1.211*(state.xoffset - 846)).toFixed(1);  //map starts 1000px right off screen, 0.73 and 0.915 maps directly to geo coordinates
  }

  const swap = event =>{
    if (state.button == "Down"){
      setTimeout(() =>{
      setShow1(false);
      setShow2(true);
      state.button = "Up";
      }, 100);
    }
    else{
      setTimeout(() => {
      setShow1(true);
      setShow2(false);
      state.button = "Down";
      }, 100);
    }
    state.opacity= 0;
  }

  const [show1, setShow1]=useState(true)
  const [show2, setShow2]=useState(false)
  // REQUESTS

  const [placeID, setPlaceID] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  //Not yet requesting coordinates/location
  //Also - to remove the "acitve" column in the Places table
  //const[racesTable, setRacesTable] = useState(null); Only needed if we add the place table at the bottom of the page.

  function changePlace() {
    axios.patch("http://localhost:5000/admin/places/edit/" + placeID, {place_name: name, description: desc, coords: `${state.xcoord}` + ", " + `${state.ycoord}`}).then(function(response){console.log(response);})
    location.reload();
  }

  function postPlace() {
    axios.post("http://localhost:5000/admin/places/post", {place_name: name, description: desc, coords: `${state.xcoord}` + ", " + `${state.ycoord}`}).then(function(response){console.log(response);})
    location.reload();
  }

  function deletePlace() {
    axios.delete("http://localhost:5000/admin/places/delete/" + placeID, {id: placeID}).then(function(response){console.log(response);})
    location.reload();
  }

  return (
    <>
    <header><img className="logo" src={logo} alt="UWA"></img><h1>Aspire UWA</h1><h2 className="sub-text">Web-App Admin Page</h2></header>
    <div className="admin-div">
      <div >
        <Sidebar id="sidebar-location"/>
        </div>
        <div className="table-display" >
        <div className="database-table" id="locations-table1">
                <h1>Locations Editor:</h1>
                <div className="form-group">
                    <label>Location ID:</label>
                    <input type="text" value={placeID} onChange={(e) => setPlaceID(e.target.value)}
                      placeholder="Enter Location ID" className="form-control"></input>
                  </div>
                  
                  <div className="form-group">
                    <label>Location Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Location Name" className="form-control"></input>
                  </div>
                  
                  <div className="form-group">
                    <label>Description:</label>
                    <input type="text" className="form-control" placeholder="Enter Description" value={desc} 
                      onChange={(e) => setDesc(e.target.value)}></input>
                  </div>

                  <div className="form-group">
                    <label>Coordinates:</label>
                    <input type="text" className="form-control" placeholder={`${state.xcoord}` + ", " + `${state.ycoord}`}></input>
                  </div>

                  <button type="button" className="btn btn-primary admin-button" onClick={postPlace}>Add</button>
                  <button type="button" className="btn btn-primary admin-button" onClick={changePlace}>Update</button>
                  <button type="button" className="btn btn-primary admin-button" onClick={deletePlace}>Delete</button>
            </div>
            <div className="locations-table" >
                <h1>Map</h1>
                <button className="swap-map" onClick={swap}>{`${state.button}`}</button>
                {
                  show1?<img className="mapsvg" id="map-top" onMouseMove={(event) => handleMouseMove(event)} onClick={store}src={map1} alt="campus map1">
                  </img>:null
                } 
                {
                  show2?<img className="mapsvg" id="map-bot"  onMouseMove={(event) => handleMouseMove(event)} onClick={store}src={map2} alt="campus map2">
                  </img>:null
                }
                <div id="marker" style={{position: "absolute", left: `${state.xoffset}px`, top: `${state.yoffset}px`, opacity: `${state.opacity}`,}}>
                <BsFillCircleFill/>
                </div>
                
            </div>
        </div>
    </div>
    </>
  );
}
  
  export default AdminPlaces;