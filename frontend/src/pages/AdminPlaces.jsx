import React, { useState } from "react";

//Components
import Sidebar from "../components/sidebar";

//icons
import {BsFillCircleFill} from "react-icons/bs"
//Styling
import "./styling/AdminSide.css"
import "../components/sidebar.css"

//map SVG file
import map from "../assets/images/campusmap.svg";

//Variables
const state ={
  xoffset: 0,
  yoffset: 0,
  delta: 0,
  opacity: 0.0,
};


function AdminPlaces () {
  const [coord, setCoord] = useState([])
  const handleMouseMove = (event) =>{
    let coordinates = [event.clientX, event.clientY]
    setCoord(coordinates)
  }
  console.log(coord)

  //store coordinates function
  const store = event =>{
     state.xoffset = coord[0] -17;
     state.yoffset = coord[1] -28;
     state.opacity = 1;
  }
  return (
    <>
    <div className="admin-div">
        <Sidebar/>
        <div className="table-display">
            <div className="database-table">
                <h1>Location Editor</h1>
                {/* THE ACTION SHOULD BE BINDED WITH THE SUBMIT TO THE DATABASE */}
                <form action="">
                  <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Enter Name"></input>
                  </div>
                  <div class="form-group">
                    <label for="location">Location</label>
                    <input type="number" class="form-control" id="location" placeholder="Select Location"></input>
                  </div>
                  <div class="form-group">
                    <label for="description">Description</label>
                    <input type="text" class="form-control" id="description" placeholder="Enter Description"></input>
                  </div>
                  <button className="submit-button" type="submit" class="btn btn-default">Submit</button>
                </form>
            </div>
            <div className="database-table">
                <h1>Map</h1>
                <div id="marker" style={{position: "absolute", left: `${state.xoffset}px`, top: `${state.yoffset}px`, opacity: `${state.opacity}`,}}>
                <BsFillCircleFill/>
                </div>
                <img className="mapsvg" width="550" height="1500" onMouseMove={(event) => handleMouseMove(event)} onClick={store}src={map} alt="campus map">
                </img>
            </div>
        </div>
    </div>
    </>
  );
}
  
  export default AdminPlaces;