import React, { useState } from "react";
import Button from 'react-bootstrap/Button';

import AspireNavbar from "../components/navbar";
import HelpButton from "../components/helpButton";

import "./styling/ExternalLinks.css";

function ExternalLinks() {
  return (
    <>
    <div className="eLinksDiv">

      <div className="d-grid gap-3">
        <h1>UWA Information Links</h1>
        <Button variant="light" size="lg" href="https://www.uwa.edu.au/study/how-to-apply/admission-entry-pathways/" target="_blank"><h3>Pathways to Uni</h3></Button>
        <Button variant="light" size="lg" href="https://www.uwa.edu.au/study/Scholarships/Explore" target="_blank"><h3>Scholarships</h3></Button>
        <Button variant="light" size="lg" href="https://www.uwa.edu.au/study/student-life/student-support" target="_blank"><h3>Student Support Services</h3></Button>
        <Button variant="light" size="lg" href="https://www.uwa.edu.au/students/Support-services/Academic-support" target="_blank"><h3>Study Resources</h3></Button>
        <h1>Useful External Links</h1>
        <Button variant="light" size="lg" href="https://myfuture.edu.au/" target="_blank"><h3>myfuture.edu.au</h3></Button>
        <Button variant="light" size="lg" href="https://myfuture.edu.au/bullseyes" target="_blank"><h3>Career Bullseyes</h3></Button>
      </div>
    
    </div>
    <AspireNavbar/>
    <HelpButton/>
    </>
  )
}

export default ExternalLinks