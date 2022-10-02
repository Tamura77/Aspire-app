import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import "./sidebar.css";




//sidebar data/page
import {pages} from "./sidebardata";

function sidebar(){
    return (
        <>
        <div className="sidebar">
           <ul className="sidebarlist">
            {pages.map((val, key) => {
                return ( <li key ={key}
                    className="row"
                    onClick={() => {window.location.pathname = val.Link;
                }}>
                    {" "} 
                    <div id="list">
                        <div id="icon">
                            {val.Icon}
                        </div>
                        <div id="name">
                            {val.name}
                        </div>
                    </div>
                </li>
                );
            })}
           </ul>
        </div>
        </>
    );
}
export default sidebar