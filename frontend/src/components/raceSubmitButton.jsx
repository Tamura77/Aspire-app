// CSS
import "./raceSubmitButton.css";

// Bootstrap button
import Button from "react-bootstrap/Button";


function RaceSubmitButton(props) {
    if (props.show == true){
        return (
            <div className="fixed-bottom raceSubmit-div">
                <Button
                    className="raceSubmitButton"
                    type = "button"
                    variant="success"
                    onClick={function(e){
                        localStorage.removeItem("racemarkers");
                        localStorage.removeItem("raceanswers")
                        // routeChange();
                    }}
                    href='/'
                    >
                    Submit
                </Button>
            </div>
        );
    }
}
export default RaceSubmitButton;
