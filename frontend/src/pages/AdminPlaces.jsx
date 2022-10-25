import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { verifyLogin } from "../utils/verifyLogin";
import axios from "axios"
import Table from 'react-bootstrap/Table';

//Components
import Sidebar from "../components/sidebar";
import AspireSubmitPopup from "../components/submitPopup";

//icons
import {BsFillCircleFill} from "react-icons/bs"
import {BsFillTrashFill} from "react-icons/bs"
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
  const [coords1, setCoords1] = useState("");
  const [placesTable, setPlacesTable] = useState(null);
  const [request, setRequest] = useState("");
  const [modalShow, setModalShow] = useState(false);
  //Not yet requesting coordinates/location
  //Also - to remove the "acitve" column in the Places table
  //const[racesTable, setRacesTable] = useState(null); Only needed if we add the place table at the bottom of the page.

  function changePlace() {
    axios.patch("http://localhost:5000/admin/places/edit/" + placeID, {place_name: name, description: desc, coords: coords1}).then(function(response){console.log(response);})
    location.reload();
  }

  function postPlace() {
    axios.post("http://localhost:5000/admin/places/post", {place_name: name, description: desc, coords: coords1}).then(function(response){console.log(response);})
    location.reload();
  }

  function deletePlace() {
    axios.delete("http://localhost:5000/admin/places/delete/" + placeID, {id: placeID}).then(function(response){console.log(response);})
    location.reload();
  }

  function submitRequest() {
    if (request == "changePlace") {
      changePlace();
    }
    else if (request == "deletePlace") {
      deletePlace();
    }
    else if (request == "postPlace"){
      postPlace();
    }
  }

  const fetchData = async () => {
    const places = await axios.get("http://localhost:5000/table/places");

    setPlacesTable(
      <Table striped>
        <thead>
          <tr>
            <th>ID:</th>
            <th>Name:</th>
            <th>Description:</th>
            <th>Coordinates:</th>
          </tr>
        </thead>
        <tbody>
          {places.data.map(({id, name, coordinates, description}) =>(
          <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>
              {description.length > 20 ? `${description.substring(0, 20)}...` : description}
            </td>
            <td>{coordinates}</td>
            <td>
              <button type="button" className="btn btn-danger" onClick={function(e) { 
                  setPlaceID(id)
                  setRequest("deletePlace")
                  setModalShow(true)
                }}><BsFillTrashFill/></button>
              <button type="button" className="btn btn-primary" onClick={function(e) { 
                  setPlaceID(id)
                  setName(name)
                  setDesc(description)
                  setCoords1(coordinates)
                  setRequest("changePlace");
                }}>Select</button></td>
          </tr>
          ))}
        </tbody>
      </Table>
    );

  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
    <header><img className="logo" src={logo} alt="UWA"></img><h1>Aspire UWA</h1><h2 className="sub-text">Web-App Admin Page</h2></header>
    <div className="admin-div">
      <div >
        <Sidebar id="sidebar-location"/>
        </div>
        <div className="table-display" >
        <div className="database-table">
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
                    <input type="text" className="form-control" placeholder="Enter Coordinates" value={coords1} onChange={(e) => setCoords1(e.target.value)}></input>
                  </div>
                  <button type="button" className="btn btn-primary" onClick={function(e){
                    if (name && desc && coords1) {
                      setRequest("postPlace");
                      setModalShow(true)
                    } else {
                      alert("Please enter a location name, description and/or coordinates.")
                    }
                    }}>Add</button>
                  <button type="button" className="btn btn-primary admin-button" onClick={
                    function(e){
                      if (placeID && (name || desc || coords1)) {
                        setRequest("changePlace");
                        setModalShow(true);
                      } else {
                        alert("Please change a field or enter or select a valid location ID.")
                      }
                    }}>Update</button>
                    <p className="note"><span>Note:</span> map coordinates span across 170,89 to -170,-89. 
                    <list> 
                      <li>170,89 refers to the top right of the map</li>
                      <li>-170,89 refers to the top left of the map</li>
                      <li>170,-89 refers to the bottom right of the map</li>
                      <li>-170,-89 refers to the bottom left of the map</li>
                    </list></p>
                  <AspireSubmitPopup
                      submitRequest = {submitRequest}
                      show = {modalShow}
                      onHide={() => setModalShow(false)}
                  />
            </div>
            <div className="database-table" >
                <h1>Locations:</h1>
                {placesTable}
            </div>
        </div>
    </div>
    </>
  );
}
  
  export default AdminPlaces;