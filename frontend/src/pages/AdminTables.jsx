import React, { useState, useEffect } from "react";
import axios from "axios"

//Components
import Sidebar from "../components/sidebar";

//Styling
import "./styling/AdminSide.css"
import "../components/sidebar.css"

function AdminTables () {
    const fetchData = async () => {
        const races = await axios.get("http://localhost:5000/table/races");
        const tasks = await axios.get("http://localhost:5000/table/tasks");
        const places = await axios.get("http://localhost:5000/table/places");
        tableMaker(races.data, "races");
        tableMaker(tasks.data, "tasks");
        tableMaker(places.data, "places");
    }
    function tableMaker(jsonData, divID) {
        let col = [];
        for (let i = 0; i < jsonData.length; i++) {
          for (let key in jsonData[i]) {
            if (col.indexOf(key) === -1) {
              col.push(key);
            }
          }
        }
      
        // Create table
        const table = document.createElement("table");
      
        // Create table header
        let tr = table.insertRow(-1);
      
        for (let i = 0; i < col.length; i++) {
          let th = document.createElement("th");
          th.innerHTML = col[i];
          tr.appendChild(th);
        }
      
        // Add JSON data to table rows
        for (let i = 0; i < jsonData.length; i++) {
      
          tr = table.insertRow(-1);
      
          for (let j = 0; j < col.length; j++) {
            let tabCell = tr.insertCell(-1);
            tabCell.innerHTML = jsonData[i][col[j]];
          }
        }

        // Append table to div
        const divTableData = document.getElementById(divID);
        divTableData.innerHTML = "";
        divTableData.appendChild(table);
    }

    useEffect(() => {
        console.log("useEffect hook called");
        fetchData();
    }, [])

    return (
      <>
      <div className="admin-div">
          <Sidebar/>
          <div className="table-display">
              <div className="database-table" id="places">
                  <h1>Places</h1>
              </div>
              <div className="database-table" id="tasks">
                  <h1>Tasks</h1>
              </div>
              <div className="database-table x" id="races">
                  <h1>Races</h1>
              </div>
          </div>
      </div>
      </>
    );
  }
  
  export default AdminTables;