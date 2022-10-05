import React, { useState } from "react";
import { BrowserRouter as Router , Link } from "react-router-dom";

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
  return (
    <>
    <div className="admin-div">
        <Sidebar/>
        <div className="table-display">
            <div className="database-table">
                <h1>Task Editor</h1>
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
                <h1>Locations</h1>
            </div>
        </div>
    </div>
    </>
  );
}

export default AdminTasks