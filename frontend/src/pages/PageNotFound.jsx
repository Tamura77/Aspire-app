import {useQuery} from "@tanstack/react-query";
import { fetchExample } from "../requests/example";
import React, { useState, useEffect} from 'react';
import axios from "axios"



function PageNotFound () {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [linkID, setID] = useState("");

  const fetchLinks = async () => {
    const links = await axios.get("http://localhost:5000/links");
    tableMaker(links.data);
}

  function changeLink() {
    console.log(link)
    axios.patch("http://localhost:5000/admin/edit/" + linkID, {title: name, url: link}).then(function(response){console.log(response);})
    location.reload();
  }

  useEffect(() => {
    console.log("useEffect hook called");
    fetchLinks();
}, [])

function tableMaker(links) {
  let col = [];
  for (let i = 0; i < links.length; i++) {
    for (let key in links[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }

  // Create table.
  const table = document.createElement("table");

  // Create table header row using the extracted headers above.
  let tr = table.insertRow(-1);                   // table row.

  for (let i = 0; i < col.length; i++) {
    let th = document.createElement("th");      // table header.
    th.innerHTML = col[i];
    tr.appendChild(th);
  }

  // add json data to the table as rows.
  for (let i = 0; i < links.length; i++) {

    tr = table.insertRow(-1);

    for (let j = 0; j < col.length; j++) {
      let tabCell = tr.insertCell(-1);
      tabCell.innerHTML = links[i][col[j]];
    }
  }

  // Now, add the newly created table with json data, to a container.
  const divTableData = document.getElementById('table');
  divTableData.innerHTML = "";
  divTableData.appendChild(table);
  //fetchLinks();
}

  return (
    <div className="error">
      <h1>Page not found</h1>
      <div className="form-group mt-3">
          <label>ID</label>
          <input type="text"
          id="ID" 
          value={linkID}
          onChange={(e) => setID(e.target.value)}
          className="form-control mt-1"
          placeholder="Enter Link ID"
          />
          <label>Title</label>
          <input
          type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control mt-1"
              placeholder="Enter New Title"
          />
          <label>URL</label>
          <input
          type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="form-control mt-1"
              placeholder="Enter New Link"
          />
          <button type="button" className="btn btn-primary" onClick={changeLink}>Submit</button>
        </div>
        <div id="table"></div>
        
    </div>
    
  )
}

export default PageNotFound;