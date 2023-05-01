import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Root from "./pages/Root";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      {/* Parent Element for BrowserRouter */}
      <div id="App" className="">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Root />}></Route>
            <Route path="/auth" element={<Auth />}></Route>
            {/* Returns a not found page in route id not defiened */}
            <Route path="*" element={<NotFound />}></Route>{" "}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
