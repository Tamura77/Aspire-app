// CSS
import "./raceSubmitButton.css";

// Bootstrap button
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";

// HelpButton component links to the help page
function RaceSubmitButton(props) {
    if (props.show == true){
        const navigate = useNavigate();
        const routeChange = () =>{ 
            let path = `/`; 
            navigate(path);
        }
        return (
            <div className="fixed-top">
                <Button
                    className="raceSubmitButton"
                    type = "button"
                    variant="success"
                    onClick={function(e){
                        console.log("hello");
                        localStorage.removeItem("racemarkers");
                        routeChange();
                    }}
                    >
                    Submit
                </Button>
            </div>
        );
    }
    return null
}

export default RaceSubmitButton;
