import React, { useState, useEffect, useRef } from "react";
import axios from "axios"
import Table from 'react-bootstrap/Table';

import { BsFillTrashFill } from "react-icons/bs";

//Components
import Sidebar from "../components/sidebar";
import AspireSubmitPopup from "../components/submitPopup";

//Styling
import "./styling/AdminSide.css"
import "../components/sidebar.css"

function AdminLinks () {

  const [linkID, setLinkID] = useState("");
  const [title, setTitle] = useState("");
  const [url, setURL] = useState("");
  const [linksTable, setLinksTable] = useState(null);
  const [request, setRequest] = useState("");
  const [modalShow, setModalShow] = useState(false);

  function changeLink() {
    axios.patch("http://localhost:5000/admin/links/edit/" + linkID, {title: title, url: url}).then(function(response){console.log(response);})
    location.reload();
  }

  function postLink() {
    axios.post("http://localhost:5000/admin/links/post", {title: title, url: url}).then(function(response){console.log(response);})
    location.reload();
  }

  function deleteLink() {
    axios.delete("http://localhost:5000/admin/links/delete/" + linkID, {id: linkID}).then(function(response){console.log(response);})
    location.reload();
  }

  function submitRequest() {
    if (request == "changeLink") {
      changeLink();
    }
    else if (request == "deleteLink") {
      deleteLink();
    }
    else if (request == "postLink"){
      postLink();
    }
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
          {links.data.map(({id, title, url}) =>(
          <tr key={id}>
            <td>{id}</td>
            <td>{ title.length > 20 ? `${title.substring(0, 40)}...` : title }</td>
            <td>{ url.length > 20 ? `${url.substring(0, 20)}...` : url }</td>
            <td>
              <button type="button" className="btn btn-danger" onClick={function(e) { 
                  setLinkID(id)
                  setRequest("deleteLink");
                  setModalShow(true)
                }}><BsFillTrashFill/></button>
                </td>
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
      <Sidebar/>
      <div className="table-display">
            <div className="database-table">
                <h1>Links Editor:</h1>
                <div className="form-group">
                    <label>Link ID:</label>
                    <input type="text" id="ID" value={linkID} onChange={(e) => setLinkID(e.target.value)}
                      placeholder="Enter Link ID" className="form-control"></input>
                  </div>
                  
                  <div className="form-group">
                    <label>Title:</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter Title" className="form-control"></input>
                  </div>
                  
                  <div className="form-group">
                    <label>URL:</label>
                    <input type="text" id="URL" className="form-control" placeholder="Enter URL" value={url} 
                    onChange={(e) => setURL(e.target.value)}></input>
                  </div>

                  <button type="button" className="btn btn-primary" onClick={
                    function(e){
                      setRequest("changeLink");
                      setModalShow(true)
                    }}>Update</button>
                  <button type="button" className="btn btn-primary" onClick={function(e){
                      setRequest("postLink");
                      setModalShow(true)
                    }}>Post</button>
            </div>
        </div>
            <div className="database-table" id="tasks">
                <h1>Links</h1>
                {linksTable}
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
  
  export default AdminLinks;