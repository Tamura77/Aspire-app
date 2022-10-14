import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router , Link, useNavigate} from "react-router-dom";
import { verifyLogin } from "../utils/verifyLogin";
import axios from "axios"
import Table from 'react-bootstrap/Table';

//icons
import {BsFillArrowRightSquareFill} from "react-icons/bs"
import {BsFillArrowLeftSquareFill} from "react-icons/bs"
import { BsFillTrashFill } from "react-icons/bs";

//Components
import Sidebar from "../components/sidebar";
import AspireSubmitPopup from "../components/submitPopup";

//Styling
import "./styling/Tasks.css"
import "../components/sidebar.css"


//Below is what was initially here it can just be uncommented out if you prefer it - Sofia

// function Tasks() {
//     const [isshown, setisshown] = useState(false);
//     const [isshown2, setisshown2] = useState(true);

//     const handleClick = event =>{
//         setTimeout(() => {
//         setisshown(current => !current);
//         setisshown2(current => !current);
//     }, 50);
// }
//   return (
//     <>
//     <div className="tasks">
//         {isshown2 && (
//         <div id = "arrow"onClick={handleClick}><BsFillArrowRightSquareFill/></div>
//         )}
//         {isshown && (
//             <div id="sidebar">
//             <Sidebar/>
//             <div id = "close" onClick={handleClick}>
//             <BsFillArrowLeftSquareFill/>
//             </div>
//             </div>
//         )}
//         Test 1
//     </div>
//     </>
//   );
// }

//Below is what I currently have for the other pages - Sofia

function AdminTasks () {

  useEffect(verifyLogin(useNavigate()), []);

  const [place, setPlace] = useState("");
  const [desc, setDesc] = useState("");
  const [task, setTask] = useState("");
  const [taskID, setID] = useState("");
  const[tasksTable, setTasksTable] = useState(null);
  const [request, setRequest] = useState("");
  const [modalShow, setModalShow] = useState(false);
  

  function changeTask() {
    console.log(task)
    axios.patch("http://localhost:5000/admin/tasks/edit/" + taskID, {location: place, description: desc}).then(function(response){console.log(response);})
    location.reload();
  }

  function postTask() {
    axios.post("http://localhost:5000/admin/tasks/post", {location: place, description: desc}).then(function(response){console.log(response);})
    location.reload();
  }

  function deleteTask() {
    axios.delete("http://localhost:5000/admin/tasks/delete/" + taskID, {id: taskID}).then(function(response){console.log(response);})
    location.reload();
  }

  function submitRequest() {
    if (request == "changeTask") {
      changeTask();
    }
    else if (request == "deleteTask") {
      deleteTask();
    }
    else if (request == "postTask"){
      postTask();
    }
  }

  const fetchData = async () => {
    const tasks = await axios.get("http://localhost:5000/table/tasks");
    const places = await axios.get("http://localhost:5000/table/places")
    dropDownMaker(places.data, "place-select");

    setTasksTable(
      <Table striped>
        <thead>
          <tr>
            <th>Task ID:</th>
            <th>Task Location:</th>
            <th>Task Description:</th>
          </tr>
        </thead>
        <tbody>
          {tasks.data.map(({id, name, description}) =>(
          <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{description.length > 20 ? `${description.substring(0, 20)}...` : description}</td>
            <td>
              <button type="button" className="btn btn-danger" onClick={function(e) { 
                  setID(id)
                  setRequest("deleteTask");
                  setModalShow(true)
                }}><BsFillTrashFill/></button></td>
          </tr>
          ))}
        </tbody>
      </Table>
    );
}

function dropDownMaker(jsonData, divID) {
  for (let i = 0; i < jsonData.length; i++) {
    var option = document.createElement("option");
    option.value = jsonData[i].id;
    option.innerHTML = jsonData[i].name;
    document.getElementById(divID).appendChild(option);
  }
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
                <h1>Task Editor:</h1>
                  <div className="form-group">
                    <label>Task ID:</label>
                    <input type="text" value={taskID} onChange={(e) => setID(e.target.value)}
                      placeholder="Enter Task ID" className="form-control"></input>
                  </div>
                  
                  <div className="form-group">
                    <label>Location:</label>
                    <select id="place-select" className="form-control" value={place} onChange={(e) => setPlace(e.target.value)}>
                      <option value=""></option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Description:</label>
                    <input type="text" className="form-control" id="description" placeholder="Enter Description" value={desc} 
                    onChange={(e) => setDesc(e.target.value)}></input>
                  </div>

                  <button type="button" className="btn btn-primary" onClick={
                    function(e){
                      setRequest("changeTask");
                      setModalShow(true)
                    }}>Update</button>
                  <button type="button" className="btn btn-primary" onClick={function(e){
                      setRequest("postTask");
                      setModalShow(true)
                    }}>Post</button>
            </div>
            <div className="database-table" id="tasks">
                <h1>Tasks</h1>
                {tasksTable}
            </div>
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

export default AdminTasks