import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import axios from "axios"

import AspireNavbar from "../components/navbar";
import HelpButton from "../components/helpButton";

import "./styling/ExternalLinks.css";

// Fetches the links from the database each time the page is loaded


function ExternalLinks() {

  const [uwaLinks, setUwaLinks] = useState("");
  const [otherLinks, setOtherLinks] = useState("");
  const [surveyLinks, setSurveyLinks] = useState("");

  const fetchLinks = async () => {
    const links = await axios.get("http://localhost:5000/table/links");

    setUwaLinks(
      links.data.filter(({category}) => (category == "UWA")).map(({id, title, url}) =>(
        <Button key={id} variant="light" size="lg" href={url} target="_blank">
          <h3>{title}</h3>
        </Button>
      ))
    );

    setOtherLinks(
      links.data.filter(({category}) => (category == "External")).map(({id, title, url}) =>(
        <Button key={id} variant="light" size="lg" href={url} target="_blank">
          <h3>{title}</h3>
        </Button>
      ))
    );

    setSurveyLinks(
      links.data.filter(({category}) => (category == "Survey")).map(({id, title, url}) =>(
        <Button key={id} variant="light" size="lg" href={url} target="_blank">
          <h3>{title}</h3>
        </Button>
      ))
    );
  }

  useEffect(() => {
    fetchLinks();
  }, [])
  
  return (
    <>
    <div className="eLinksDiv">

      <div className="d-grid gap-3">
        <h1>UWA Information Links</h1>
        {uwaLinks}
        <h1>Useful External Links</h1>
        {otherLinks}
        <h1>Student Survey</h1>
        {surveyLinks}
      </div>
    
    </div>
    <AspireNavbar/>
    <HelpButton/>
    </>
  )
}

export default ExternalLinks