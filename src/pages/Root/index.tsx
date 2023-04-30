import Navbar from "./Navbar";
import "./style.sass"

export default function Root() {
  return (
    <>
      <div id="Root">
        <section className="header">
          <Navbar />
        </section>
      </div>
    </>
  );
}


