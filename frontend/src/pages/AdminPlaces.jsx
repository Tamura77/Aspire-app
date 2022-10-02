import React, { useState } from "react";

//Components
import Sidebar from "../components/sidebar";

//Styling
import "./styling/AdminSide.css"
import "../components/sidebar.css"

function AdminPlaces () {
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
            </div>
        </div>
    </div>
    </>
  );
}
  
  export default AdminPlaces;