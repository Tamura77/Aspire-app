import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { verifyLogin } from "../utils/verifyLogin";
import axios from "axios"
import Table from 'react-bootstrap/Table';

import { BsFillTrashFill } from "react-icons/bs";

//Components
import Sidebar from "../components/sidebar";
import AspireSubmitPopup from "../components/submitPopup";

import logo from "../assets/images/uwa.svg";

//Styling
import "./styling/AdminSide.css"
import "../components/sidebar.css"


function AdminLinks () {

  useEffect(verifyLogin(useNavigate()), []);

  const [linkID, setLinkID] = useState("");
  const [title, setTitle] = useState("");
  const [url, setURL] = useState("");
  const [cat, setCat] = useState("");
  const [linksTable, setLinksTable] = useState(null);
  const [request, setRequest] = useState("");
  const [modalShow, setModalShow] = useState(false);

  function changeLink() {
    axios.patch("http://localhost:5000/admin/links/edit/" + linkID, { title: title, url: url, cat: cat }).then(function (response) { console.log(response); })
    location.reload();
  }

  function postLink() {
    axios.post("http://localhost:5000/admin/links/post", { title: title, url: url, cat: cat }).then(function (response) { console.log(response); })
    location.reload();
  }

  function deleteLink() {
    axios.delete("http://localhost:5000/admin/links/delete/" + linkID, { id: linkID }).then(function (response) { console.log(response); })
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
            <th>Category:</th>
          </tr>
        </thead>
        <tbody>
          {links.data.map(({id, title, url, category}) =>(
          <tr key={id}>
            <td>{id}</td>
            <td>{ title.length > 20 ? `${title.substring(0, 40)}...` : title }</td>
            <td>{ url.length > 20 ? `${url.substring(0, 20)}...` : url }</td>
            <td>{category}</td>
            <td>
              <button type="button" className="btn btn-danger" onClick={function(e) { 
                  setLinkID(id)
                  setRequest("deleteLink");
                  setModalShow(true)
                }}><BsFillTrashFill/></button>
              <button type="button" className="btn btn-primary" onClick={function(e) { 
                  setLinkID(id)
                  setTitle(title)
                  setURL(url)
                  setCat(category)
                  setRequest("changeLink");
                }}>Select</button></td>
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
    <header><img className="logo" src={logo} alt="UWA"></img><h1>Aspire UWA</h1><h2 className="sub-text">Web-App Admin Page</h2></header>
    <div className="admin-div">
      <Sidebar/>
      <div className="table-display">
            <div className="database-table">
                <h1>Link Editor:</h1>
                <div className="form-group">
                    <label>Link ID:</label>
                    <input type="text" id="ID" value={linkID} onChange={(e) => setLinkID(e.target.value)}
                      placeholder="Enter/Select Link ID" className="form-control"></input>
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

                  <div className="form-group">
                    <label>Link Category:</label>
                    <select id="cat-select" className="form-control" value={cat} onChange={(e) => setCat(e.target.value)}>
                      <option value=""></option>
                      <option value="UWA">UWA</option>
                      <option value="External">External</option>
                      <option value="Survey">Survey</option>
                    </select>
                  </div>
                  
                  <button type="button" className="btn btn-primary" onClick={function(e){
                    if (title && url && cat) {
                      setRequest("postLink");
                      setModalShow(true)
                    } else {
                      alert("Please enter a title, URL and/or category.")
                    }
                    }}>Add</button>
                  <button type="button" className="btn btn-primary admin-button" onClick={
                    function(e){
                      if (linkID && (title || url || cat)) {
                        setRequest("changeLink");
                        setModalShow(true);
                      } else {
                        alert("Please change a field or enter or select a valid link ID.")
                      }
                    }}>Update</button>
            </div>

            <AspireSubmitPopup
          submitRequest = {submitRequest}
          show = {modalShow}
          onHide={() => setModalShow(false)}
        />
        </div>
        <div className="database-table" id="tasks">
          <h1>Links:</h1>
          {linksTable}
        </div>
      </div>
    </>
  );
}

  export default AdminLinks;
