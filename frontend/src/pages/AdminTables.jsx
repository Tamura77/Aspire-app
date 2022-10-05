import React, { useState } from "react";

//Components
import Sidebar from "../components/sidebar";

//Styling
import "./styling/AdminSide.css"
import "../components/sidebar.css"

function AdminTables () {
    return (
      <>
      <div className="admin-div">
          <Sidebar/>
          <div className="table-display">
              <div className="database-table">
                  <h1>Locations</h1>
              </div>
              <div className="database-table">
                  <h1>Tasks</h1>
              </div>
              <div className="database-table">
                  <h1>Races</h1>
              </div>
          </div>
      </div>
      </>
    );
  }
  
  export default AdminTables;