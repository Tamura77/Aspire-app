import React, { useState, useEffect } from 'react';
import {useQuery} from "@tanstack/react-query";
import { fetchExample } from "../requests/example";
import { useNavigate } from "react-router-dom";
import {BrowserRouter as Router, Link} from "react-router-dom";
import Sidebar from "../components/sidebar"

import "./styling/Admin.css";

function Admin(){

return (
    <div className='Admin'>
        <Sidebar/>
    </div>
); 

}

export default Admin