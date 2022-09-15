import React, { useState } from "react";
import { BrowserRouter as Router , Link } from "react-router-dom";

// Icons
import { TbDeviceGamepad2, TbMap2 } from "react-icons/tb";
import { RiLinksLine } from "react-icons/ri";
import { MdLocationPin } from "react-icons/md";

// Components
import AspireNavbar from "../components/navbar";

// Help page for information on how to use the website
function Help() {
    return (
        <>
        <div className="helpDiv"> 
            <h3 className="helpTitle">
                Race Mode
            </h3>
            <div>
                <div className="helpText">
                    Switch to the race page using the navbar and enter the racecode provided. Then wait for the race to begin
                </div>
                <div className="helpIcon">
                    <TbDeviceGamepad2 />
                </div>
                <div className="helpText">
                    To answer the questions press on the waypoint and answer in the popup.
                </div>
                <div className="helpIcon">
                    <MdLocationPin /> 
                </div>
                <div className="helpText">
                    Once you answer the waypoint will turn orange indicating its time to get your answer checked
                </div>
                <div className="helpIcon">
                    <MdLocationPin /> 
                </div>
                <div className="helpText">
                    Press the submit button and then pass the device to an administrator for marking
                </div>
                <div className="helpText">
                    If you got the answer correct the waypoint will turn green
                </div>
                <div className="helpIcon">
                    <MdLocationPin /> 
                </div>
            </div>
        </div>
        <div className="helpDiv"> 
            <h3 className="helpTitle">
                Information Mode
            </h3>
            <div>
                <div className="helpText">
                    Switch to the information page using the navbar
                </div>
                <div className="helpIcon">
                    <TbMap2 />
                </div>
                <div className="helpText">
                    Press the orange circles to show additional information about the locations
                </div>
                <div className="helpIcon">
                    <MdLocationPin /> 
                </div>
            </div>
        </div>
        <div className="helpDiv"> 
            <h3 className="helpTitle">
                Useful Links
            </h3>
            <div>
                <div className="helpText">
                    Switch to the useful links page using the navbar
                </div>
                <div className="helpIcon">
                    <RiLinksLine />
                </div>
                <div className="helpText">
                    Press on the appropriate links to find addtional information
                </div>
            </div>
        </div>
        <AspireNavbar />
        </>
    );
}

export default Help
