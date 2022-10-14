import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { verifyLogin } from "../utils/verifyLogin";
import axios from "axios"
import Table from 'react-bootstrap/Table';

//Components
import Sidebar from "../components/sidebar";

//Styling
import "./styling/AdminSide.css"
import "../components/sidebar.css"

function AdminRaces() {

  useEffect(verifyLogin(useNavigate()), []);

  const [linkID, setLinkID] = useState("");
  const [title, setTitle] = useState("");
  const [url, setURL] = useState("");
  const [linksTable, setLinksTable] = useState(null);

  function changeLink() {
    axios.patch("http://localhost:5000/admin/links/edit/" + linkID, { title: title, url: url }).then(function (response) { console.log(response); })
    location.reload();
  }

  function postLink() {
    axios.post("http://localhost:5000/admin/links/post", { title: title, url: url }).then(function (response) { console.log(response); })
    location.reload();
  }

  function deleteLink() {
    axios.delete("http://localhost:5000/admin/links/delete/" + linkID, { id: linkID }).then(function (response) { console.log(response); })
    location.reload();
  }

  const fetchData = async () => {
    const links = await axios.get("http://localhost:5000/table/links");

    setLinksTable(
      <Table striped>
        <thead>
          <tr>
            <th>Link ID:</th>
            <th>Title:</th>
            <th>URL:</th>
          </tr>
        </thead>
        <tbody>
          {links.data.map(({ id, title, url }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{title.length > 20 ? `${title.substring(0, 40)}...` : title}</td>
              <td>{url.length > 20 ? `${url.substring(0, 20)}...` : url}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <div className="admin-div">
        <Sidebar />
        <div className="table-display">
          <div className="database-table">
            <h1>Links Editor:</h1>
            <div className="form-group">
              <label>Link ID:</label>
              <input type="text" value={linkID} onChange={(e) => setLinkID(e.target.value)}
                placeholder="Enter Link ID" className="form-control"></input>
            </div>

            <div className="form-group">
              <label>Title:</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title" className="form-control"></input>
            </div>

            <div className="form-group">
              <label>URL:</label>
              <input type="text" className="form-control" placeholder="Enter URL" value={url}
                onChange={(e) => setURL(e.target.value)}></input>
            </div>

            <button type="button" className="btn btn-primary" onClick={changeLink}>Update</button>
            <button type="button" className="btn btn-primary" onClick={deleteLink}>Delete</button>
            <button type="button" className="btn btn-primary" onClick={postLink}>Post</button>
          </div>
        </div>
        <div className="database-table" id="tasks">
          <h1>Links</h1>
          {linksTable}
        </div>
      </div>
    </>
  );
}

export default AdminRaces;