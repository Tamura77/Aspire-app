import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./sidebar.css";


import { BiLogOut } from "react-icons/bi"

//sidebar data/page
import { pages } from "./sidebardata";

function sidebar() {

    const navigate = useNavigate();

    return (
        <>
            <div className="sidebar">
                <ul className="sidebarlist">
                    {pages.map((val, key) => {
                        return (<li key={key}
                            className="row"
                            onClick={() => {
                                window.location.pathname = val.Link;
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
                    <li className="row"
                        onClick={() => {
                            sessionStorage.clear();
                            navigate("/admin");
                        }}>
                        <div id="list">
                            <div id="icon">
                                <BiLogOut />
                            </div>
                            <div id="name">
                                Logout
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}
export default sidebar
