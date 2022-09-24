import React, { useState } from 'react';
import {useQuery} from "@tanstack/react-query";
import { fetchExample } from "../requests/example";
import { useNavigate } from "react-router-dom";
import {BrowserRouter as Router, Link} from "react-router-dom";
import axios from 'axios';

import HelpButton from "../components/helpButton";
import AspireNavbar from "../components/navbar";
import AspireInfoPopup from "../components/infoPopup";
import ReactTooltip from "react-tooltip";
import "./styling/Map.css";

import map from "../assets/images/campusmap.svg";

import {
ComposableMap,
Geographies,
Geography,
Marker,
Annotation,
ZoomableGroup,
} from "react-simple-maps";


// Dummy data base of markers
// Max coordinates are [180,-89]


const markers1 = [
    {
      name: "Sunken Garden",
      coordinates: [-105, 87.8],
      description: "For most of the year the Sunken Garden is an idyllic retreat for staff, students and wedding functions. Set near the Swan River in Matilda Bay and Kings Park, the Sunken Garden offers stunning surrounds for all manner of events, including wedding ceremonies, photographic sessions and filming.",
      number: 0
    },
    {
      name: "Winthrop Hall",
      coordinates: [-60, 86.2],
      description: "Built in 1932 and known for its iconic clock tower, Winthrop Hall is the centre of university life. At the end of their studies, students dress in full academic regalia for their graduation ceremony here. The hall also hosts a variety of events from lectures and concerts, to balls and exhibitions."
    },
    {
      name: "Reflection Pond",
      coordinates: [-60,87.2],
      description: "In 1932, the grand opening of Winthrop Hall was with the reflection pond, designed to showcase the elegant design of the building, expected to not be ready in time. Word reached the student body and through a great effort the students took direction from Engineers to have it completed, hours before the official opening."
    },
    {
      name: "Sommerville Auditorium",
      coordinates: [50,87],
      description: "This charming auditorium was designed to resemble a cathedral of Norfolk Island pines. Crowds gathered for the first official performance in 1945. Today, the auditorium is used for Perth Festival’s film season from November to April each year. The gorgeous setting holds up to 1000 cinema-goers on deckchairs with grassy picnic areas also on offer."
    },
    {
      name: "Octagon Theatre",
      coordinates: [8,85.5],
      description: "The Octagon Theatre is considered the heart of theatrical life on campus. The venue hosts opera, classical and popular music, dance, theatre, stand-up comedy, seminars and other performances. It also operates as a lecture theatre during the day."
    },
    {
      name: "Reid Library",
      coordinates: [-62,71],
      description: "One of 6 UWA Libraries, the Reid Library sits at the heart of the UWA Crawley campus. Initially built in 1964, it now sees over 1 million visitors every year and serves as a student hub for student to study, connect with one another, and even serves coffee and food from the Quobba Gnarning café!"
    },
    {
      name: "Tropical Grove",
      coordinates: [-61.5,82.5],
      description: "The Tropical Grove is a lush garden made up of a circle of palm trees around a sandy ceremonial space. Take a book or your lunch and soak up the leafy green setting. The area features ancient plant species such as the Wollemi pine and the Ginkgo biloba, one of the oldest known plant species dating back 270 million years to the Jurassic period."
    },
    {
      name: "UWA Law School",
      coordinates: [25,60],
      description: "UWA Law School is WA's premier law school and the 5th oldest law school in Australia. Our world-class academics deliver outstanding legal education and produce research recognised above international standards across a wide range of areas."
    },
    {
      name: "Oak Lawn",
      coordinates: [18,40],
      description: "The expansive Oak Lawn is a great place to hang out on campus before or after class. A variety of food venues live in the Ref just beside the lawn, so you can grab some lunch and chill out under the shade. The lawn also plays host to fun Guild events like the Cultural Festival, Social Justice Week, Envirofest and De-stress Day - with kittens, dogs, chickens and piglets."
    },
    {
      name: "The Refectory",
      coordinates: [22,18],
      description: "The Refectory offers an array of international cuisines. Food stalls include Boost, Campus Kebabs, Chinese Canton, Roll'd Vietnamese, Utopia bubble Tea and Subway. A popular spot to gather and meet when you have so many options!"
    },
    {
      name: "James Oval",
      coordinates: [-53,45],
      description: "James Oval is located in the centre of UWA's Perth campus. It's considered to be one of the finest cricket wickets in the State and the venue for occasional interstate and international matches. When it's not used for sports, the oval hosts a number of events throughout the year including UWA Open Day, Orientation Week and many more."
    },
    {
      name: "Irwin St Building",
      coordinates: [-100,50],
      description: "This is what comprised UWA in 1913 before the Perth campus existed. The University was originally located on Irwin Street in the centre of Perth, but the building was rebuilt and restored and officially re-opened on the Perth campus in 1987. The building now looks out over the spacious James Oval and is used for sports like cricket and football."
    },
    {
      name: "EZONE",
      coordinates: [-130,50],
      description: "EZONE UWA provides an unparalleled student experience, building an innovative and collaborative culture based on a STEM (science, technology, engineering and mathematics) capability like no other in the country."
    },
    {
      name: "Student Central",
      coordinates: [-7,32],
      description: "Student Central is a one-stop shop for our future and current students, with services to assist throughout their university journey. It's also the home of our UniMentor program, Careers Centre, Admissions, our Future Students Centre, and International Student Support."
    },
    {
      name: "Guild Village",
      coordinates: [8,10],
      description: "Guild Village is the heart and soul of campus life at UWA, featuring cafes, food trucks, student services, shops and club activities all in the one spot."
    },
    {
      name: "Bayliss Building",
      coordinates: [-32,-35],
      description: "Inside the 17,000-square-metre complex, you'll find a ton of facilities, along with an impressive DNA double helix design on the west wall of the central atrium, and the intricate Penrose tiled floor. There's also advanced labs on every level to suit your needs."
    },
    {
      name: "Bilya Marlee",
      coordinates: [48,-68],
      description: "An Indigenous knowledge gateway housing the School of Indigenous Studies, the Bilya Marlee building is a beautiful building overlooking the Swan River. As seen by the massive art piece that drapes across a two-storey wall, Bilya Marlee translates to 'River of the Swan'."
    },
    {
      name: "Barry J Marshall Library",
      coordinates: [-30,-65],
      description: "The Barry J Marshall Library houses more than 1000 study spaces including collaborative informal study spaces, technology-equipped group work rooms, and silent study spaces."
    },
    {
      name: "Business School",
      coordinates: [60,-88.1],
      description: "Located next to the Swan River and surrounded by native trees, the UWA Business School provides a collaborative learning environment with two large lecture theatres, tutorial rooms, a reception area and a cafeteria. There's also a range of flexible spaces in which to meet, work and learn, with access to computer labs, private study rooms and lounge areas."
    },
    {
      name: "Koi Garden and Pond",
      coordinates: [9,58],
      description: "The traditional Japanese garden and koi pond, donated to the University by Tokyu Corporation in 1976, is centrally located within the Social Sciences building. The theme of the garden is the integration of the Western Australian natural environment with traditional Japanese landscape design. It is also known for it's lovely koi who love to follow students as they pass by."
    },
    {
      name: "Apoxyomenos, the Statue of Physics",
      coordinates: [-102,77],
      description: "Standing tall in the centre of the Physics building foyer is Apoxyomenos, a statue which replicates the work of great Greek Sculptor Lysippus who lived during the 4th century BC. Gifted to UWA in 1962 by the University of Rome, Apoxyomenos greets students, new and old, as they return to the study of Physics."
    },
    {
      name: "New Fortune Theatre",
      coordinates: [-22, 81.6],
      description: "An open-air stage inside the University's Arts Building, the New Fortune Theatre offers a unique patron experience. Galleries on three levels and on all sides provide an immersive experience similar to that offered by the original Fortune Theatre in London in 1600."
    },
  ];


//Main map

function Map() {
  const [modalShow, setModalShow] = React.useState(false);
  const [markers, setMarkers] = React.useState(null);
  var [infoName, setInfoName] = useState("");
  var [infoDesc, setInfoDesc] = useState("");
  const navigate = useNavigate();

  React.useEffect(() =>{axios.get("http://localhost:5000/cool",  { crossdomain: true }).then(response => {
    setMarkers(response.data);
    console.log(markers);
    //document.getElementById("test").innerHTML = text;
  });
  }, []);

  // name and description for popup with method to update values

  return (
    <div className="mappage">
      <img src={map} alt="campus map"></img>
      <div className="campusmap">
      <ComposableMap projection = "geoMercator" projectionConfig={{scale: 130}} width={793} height={1269}>
          {
            markers1.map(({name, coordinates, description}) =>(
              <Marker 
                onClick={
                  function(e){
                    setInfoName(name);
                    setInfoDesc(description);
                    setModalShow(true);
                  }
                } 
                key={name} coordinates={coordinates}>
                <circle r={10} fill="#FFA500" stroke="#fff" strokeWidth={1}/>
                <text className="markers" y={-20}>
                  {""}
                </text>
              </Marker>
              
              ))
            }
      </ComposableMap>
      <AspireNavbar />
      <HelpButton />
      <AspireInfoPopup
        name={infoName}
        description={infoDesc}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      </div>
    </div>
  );
  }
  
  export default Map
