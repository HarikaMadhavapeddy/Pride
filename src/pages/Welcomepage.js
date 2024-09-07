import intro from "../images/IntroDesktop.png";
import Nav from "./Nav";
import "./Welcomepage.css";
export default function WelcomePage() {
  return (
    <>
    <Nav/>
    <div className="introContainer">
      <img className="introImage" src={intro} />
    </div>
    </>
    
  );
}
