import React, { useState, useEffect } from "react";
import { BrowserRouter as Router , Link } from "react-router-dom";
import axios from "axios"

//icons
import {BsFillArrowRightSquareFill} from "react-icons/bs"
import {BsFillArrowLeftSquareFill} from "react-icons/bs"

//Components
import Sidebar from "../components/sidebar";

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
  const [place, setPlace] = useState("");
  const [desc, setDesc] = useState("");
  const [task, setTask] = useState("");
  const [taskID, setID] = useState("");
  

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

  const fetchData = async () => {
    const tasks = await axios.get("http://localhost:5000/table/tasks");
    tableMaker(tasks.data, "tasks");
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
            <div className="database-table">
                <h1>Task Editor:</h1>
                {/* THE ACTION SHOULD BE BINDED WITH THE SUBMIT TO THE DATABASE */}
                  <div className="form-group">
                    <label>Task ID:</label>
                    <input type="text" value={taskID} onChange={(e) => setID(e.target.value)}
                      placeholder="Enter Task ID" className="form-control"></input>
                  </div>
                  
                  <div className="form-group">
                    <label>Location:</label>
                    <input type="number" className="form-control" id="location" placeholder="Select Location" value={place}
                      onChange={(e) => setPlace(e.target.value)}></input>
                  </div>
                  
                  <div className="form-group">
                    <label>Description:</label>
                    <input type="text" className="form-control" id="description" placeholder="Enter Description" value={desc} 
                    onChange={(e) => setDesc(e.target.value)}></input>
                  </div>

                  <button type="button" className="btn btn-primary" onClick={changeTask}>Update</button>
                  <button type="button" className="btn btn-primary" onClick={deleteTask}>Delete</button>
                  <button type="button" className="btn btn-primary" onClick={postTask}>Post</button>
            </div>
            <div className="database-table" id="tasks">
                <h1>Tasks</h1>
            </div>
        </div>
    </div>
    </>
  );
}

export default AdminTasks