import CompletedSVG from "../../../assets/CompletedSVG"; // SVG of a device with checkmark
import { Link } from "react-router-dom";

export default function Intro() {
  return (
    <>
      <div className="intro bg-orange-600 flex justify-between p-24">
        {/* Introduction */}
        <div className="content text-white">
          <h1>Keep Track On Your Tasks</h1>
          <div className="buttons flex gap-5 my-5">
            <button className="secondary"><Link to="/auth?method=login" >Login</Link></button>
            <button className="secondary"><Link to="/auth?method=register">Register</Link></button>
          </div>
        </div>

        {/* SVG */}
        <CompletedSVG scale={0.7} x="50px" y="-200px" />
      </div>
    </>
  );
}
