import Intro from "./components/Intro"; // Component for Introduction of the App
import Navbar from "./components/Navbar"; 
import "./stylesheets/style.sass" // stylesheet for styling
import "./stylesheets/res.sass" // stylesheet to make website mobile responsive

export default function Root() {
  return (
    <>
      <div id="Root">
        <section className="header">
          <Navbar />
          <Intro />
        </section>
      </div>
    </>
  );
}


