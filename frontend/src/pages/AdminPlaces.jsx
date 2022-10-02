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