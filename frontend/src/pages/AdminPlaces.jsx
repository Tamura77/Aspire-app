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
      state.ycoord = (0.73*((866 + state.yoffset -17 -11))).toFixed(1);   //second map so add 866px down from top map, -11 is calibration (WIP)
     }
     else{
      state.ycoord = (0.73*((state.yoffset -17 -11))).toFixed(1);
     }
     state.xcoord = (0.915*(state.xoffset - 1000 - 28 -11)).toFixed(1);  //map starts 1000px right off screen, 0.73 and 0.915 maps directly to geo coordinates
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
  return (
    <>
    <div className="admin-div">
        <Sidebar/>
        <div className="table-display">
            <div className="locations-table">
                <h1>Location Editor</h1>
                {/* THE ACTION SHOULD BE BINDED WITH THE SUBMIT TO THE DATABASE */}
                <form action="">
                  <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Enter Name"></input>
                  </div>
                  <div class="form-group">
                    <label for="location">Location</label>
                    <input type="number" class="form-control" id="location" placeholder={`${state.xcoord}` + ", " + `${state.ycoord}`}></input>
                  </div>
                  <div class="form-group">
                    <label for="description">Description</label>
                    <input type="text" class="form-control" id="description" placeholder="Enter Description"></input>
                  </div>
                  <button className="submit-button" type="submit" class="btn btn-default">Submit</button>
                </form>
            </div>
            <div className="locations-table">
                <h1>Map</h1>
                <button className="swap-map" onClick={swap}>{`${state.button}`}</button>
                {
                  show1?<img className="mapsvg"  onMouseMove={(event) => handleMouseMove(event)} onClick={store}src={map1} alt="campus map1">
                  </img>:null
                } 
                {
                  show2?<img className="mapsvg"  onMouseMove={(event) => handleMouseMove(event)} onClick={store}src={map2} alt="campus map2">
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