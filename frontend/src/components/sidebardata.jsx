import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

//icons
import {BsCardList} from "react-icons/bs"
import {BsPinMap} from "react-icons/bs"
import {BsFillFlagFill} from "react-icons/bs"
import {BsFillQuestionCircleFill} from "react-icons/bs"
import {BsLink45Deg} from "react-icons/bs"

export const pages= [
    {
        name: "Tasks",
        Icon: <BsCardList/>,
        Link: "/tasks"
    },
    {
        name: "Races",
        Icon: <BsFillFlagFill/>,
        Link: "/races"
    },
    {
        name: "Locations",
        Icon: <BsPinMap/>,
        Link: "/locations"
    },
    {
        name: "Links",
        Icon: <BsLink45Deg/>,
        Link: "/ExernalLinks"
    },
    {
        name: "Help",
        Icon: <BsFillQuestionCircleFill/>,
        Link: "/Help"
    },
];
