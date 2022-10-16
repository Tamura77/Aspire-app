// CSS
import "./raceSubmitButton.css";

// Bootstrap button
import Button from "react-bootstrap/Button";


function RaceForfeitButton(props) {
    if (props.show == true){
        return (
            <div className="fixed-bottom raceSubmit-div">
                <Button
                    className="raceSubmitButton"
                    type = "button"
                    variant="danger"
                    onClick={function(e){
                        localStorage.removeItem("racemarkers");
                        localStorage.removeItem("raceanswers");
                        localStorage.removeItem("finish");
                        // routeChange();
                    }}
                    href='/'
                    >
                    Forfeit
                </Button>
            </div>
        );
    }
}
export default RaceForfeitButton;
