import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyLogin } from "../utils/verifyLogin";
import axios from "axios"
import Table from 'react-bootstrap/Table';

//Components
import Sidebar from "../components/sidebar";

//Styling
import "./styling/AdminSide.css"
import "../components/sidebar.css"

import logo from "../assets/images/uwa.svg";

function AdminTables () {

  useEffect(verifyLogin(useNavigate()), []);

  const[placesTable, setPlacesTable] = useState(null);
  const[tasksTable, setTasksTable] = useState(null);
  const[racesTable, setRacesTable] = useState(null);
  const[longDesc, setLongDesc] = useState(null);

  const fetchData = async () => {
      const races = await axios.get("http://localhost:5000/table/races");
      const tasks = await axios.get("http://localhost:5000/table/tasks");
      const places = await axios.get("http://localhost:5000/table/places");


      // REACT BOOTSTRAP TABLE
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
              <td onClick={
                  setLongDesc(description)
                }>
                {description.length > 20 ? `${description.substring(0, 20)}...` : description}
              </td>
              <td>{coordinates}</td>
            </tr>
            ))}
          </tbody>
        </Table>
      );
    
      setTasksTable(
        <Table striped>
          <thead>
            <tr>
              <th>ID:</th>
              <th>Location:</th>
              <th>Description:</th>
            </tr>
          </thead>
          <tbody>
            {tasks.data.map(({id, name, description}) =>(
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{description.length > 20 ? `${description.substring(0, 20)}...` : description}</td>
            </tr>
            ))}
          </tbody>
        </Table>
      );

      setRacesTable(
        <Table striped>
          <thead>
            <tr>
              <th>ID:</th>
              <th>Task:</th>
              <th>Race Name:</th>
            </tr>
          </thead>
          <tbody>
            {races.data.map(({id, description, race_name}) =>(
            <tr key={id}>
              <td>{id}</td>
              <td>{description.length > 20 ? `${description.substring(0, 20)}...` : description}</td>
              <td>{ race_name.length > 20 ? `${race_name.substring(0, 20)}...` : race_name }</td>
            </tr>
            ))}
          </tbody>
        </Table>
      );

  }

  useEffect(() => {
      console.log("useEffect hook called");
      fetchData();
  }, [])

  return (
    <>
    <header><img className="logo" src={logo} alt="UWA"></img><h1>Aspire UWA</h1><h2 className="sub-text">Web-App Admin Page</h2></header>
    <div className="admin-div">
        <Sidebar/>
        <div className="table-display">
            <div className="database-table" id="places">
                <h1>Locations:</h1>
                {placesTable}
            </div>
            <div className="database-table" id="tasks">
                <h1>Tasks:</h1>
                {tasksTable}
            </div>
            <div className="database-table x" id="races">
                <h1>Races:</h1>
                {racesTable}
            </div>
        </div>
    </div>
    </>
    );
  }
  
  export default AdminTables;