import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

//icons
import {BsCardList} from "react-icons/bs"
import {BsPinMap} from "react-icons/bs"
import {BsFillFlagFill} from "react-icons/bs"
import {BsFillQuestionCircleFill} from "react-icons/bs"
import {BsLink45Deg} from "react-icons/bs"
import {BsTable} from "react-icons/bs"

export const pages= [
    {
        name: "Help",
        Icon: <BsFillQuestionCircleFill/>,
        Link: "/AdminHelp"
    },
    {
        name: "Tables",
        Icon: <BsTable/>,
        Link: "/AdminTables"
    },
    {
        name: "Tasks",
        Icon: <BsCardList/>,
        Link: "/AdminTasks"
    },
    {
        name: "Races",
        Icon: <BsFillFlagFill/>,
        Link: "/AdminRaces"
    },
    {
        name: "Locations",
        Icon: <BsPinMap/>,
        Link: "/AdminPlaces"
    },

    // This is commented out as it current doesn't link to anything and just leads to an error page. 
    // However I was unsure if it would be used for something later, so I just commented it out. - Sofia

    // {
    //     name: "Links",
    //     Icon: <BsLink45Deg/>,
    //     Link: "/ExernalLinks"
    // },
];
