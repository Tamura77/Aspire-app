import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { verifyLogin } from "../utils/verifyLogin";
import axios from "axios"
import Table from 'react-bootstrap/Table';

import { BsFillTrashFill } from "react-icons/bs";

//Components
import Sidebar from "../components/sidebar";
import AspireSubmitPopup from "../components/submitPopup";

//Styling
import "./styling/AdminSide.css"
import "../components/sidebar.css"

function AdminRaces () {

  useEffect(verifyLogin(useNavigate()), []);

  const [raceID, setRace] = useState("");
  const [name, setName] = useState("");
  const [taskID, setTaskID] = useState("");
  const[racesTable, setRacesTable] = useState(null);
  const [request, setRequest] = useState("");
  const [modalShow, setModalShow] = useState(false);

  function changeRace() {
    axios.patch("http://localhost:5000/admin/races/edit/" + raceID, {task_id: taskID, race_name: name}).then(function(response){console.log(response);})
    location.reload();
  }

  function postRace() {
    axios.post("http://localhost:5000/admin/races/post", {task_id: taskID, race_name: name}).then(function(response){console.log(response);})
    location.reload();
  }

  function deleteRace() {
    axios.delete("http://localhost:5000/admin/races/delete/" + raceID, {id: raceID}).then(function(response){console.log(response);})
    location.reload();
  }

  function submitRequest() {
    if (request == "changeRace") {
      changeRace();
    }
    else if (request == "deleteRace") {
      deleteRace();
    }
    else if (request == "postRace"){
      postRace();
    }
  }

  function dropDownMaker(jsonData, divID) {
    for (let i = 0; i < jsonData.length; i++) {
      var option = document.createElement("option");
      option.value = jsonData[i].id;
      var description = jsonData[i].description; 
      if (description.length > 115){
        description = `${description.substring(0, 115)}...`;
      }
      option.innerHTML = description;
      document.getElementById(divID).appendChild(option);
    }
  }

  const fetchData = async () => {
    const tasks = await axios.get("http://localhost:5000/table/tasks");
    const races = await axios.get("http://localhost:5000/table/races");
    dropDownMaker(tasks.data, "task-select");

    setRacesTable(
      <Table striped>
        <thead>
          <tr>
            <th>Race ID:</th>
            <th>Task:</th>
            <th>Race Name:</th>
          </tr>
        </thead>
        <tbody>
          {races.data.map(({id, description, race_name}) =>(
          <tr key={id}>
            <td>{id}</td>
            <td>{ description.length > 40 ? `${description.substring(0, 40)}...` : description }</td>
            <td>{ race_name.length > 20 ? `${race_name.substring(0, 20)}...` : race_name }</td>
            <td>
              <button type="button" className="btn btn-danger" onClick={function(e) { 
                  setRace(id)
                  setRequest("deleteRace");
                  setModalShow(true)
                }}><BsFillTrashFill/></button></td>
          </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  const dataFetchedRef = useRef(false);

  useEffect(() => {
      console.log("useEffect hook called");
      if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
      fetchData();
  }, [])

  return (
    <>
    <div className="admin-div">
      <Sidebar/>
      <div className="table-display">
            <div className="database-table">
                <h1>Races Editor</h1>
                <div className="form-group">
                    <label>Race ID:</label>
                    <input type="text" id="ID" value={raceID} onChange={(e) => setRace(e.target.value)}
                      placeholder="Enter Race ID" className="form-control"></input>
                  </div>
                  
                  <div className="form-group">
                    <label>Task:</label>
                    <select id="task-select" className="form-control" value={taskID} onChange={(e) => setTaskID(e.target.value)}>
                      <option value=""></option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Race Name:</label>
                    <input type="text" id="race-name" className="form-control" placeholder="Enter Race Name" value={name} 
                    onChange={(e) => setName(e.target.value)}></input>
                  </div>

                  <button type="button" className="btn btn-primary" onClick={
                    function(e){
                      setRequest("changeRace");
                      setModalShow(true)
                    }}>Update</button>
                  <button type="button" className="btn btn-primary" onClick={function(e){
                      setRequest("postRace");
                      setModalShow(true)
                    }}>Post</button>
            </div>
        </div>
            <div className="database-table" id="tasks">
                <h1>Races</h1>
                {racesTable}
            </div>
            <AspireSubmitPopup
          submitRequest = {submitRequest}
          show = {modalShow}
          onHide={() => setModalShow(false)}
        />
        </div>
    </>
  );
}
  
  export default AdminRaces;