import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";

const App = () => {
  return (
    <div className="bg-slate-800 text-white h-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/equipment/:index" element={<Details />} />
      </Routes>
    </div>
  );
};

export default App;
