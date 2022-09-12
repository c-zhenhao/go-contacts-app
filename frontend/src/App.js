import "./App.css";
import { Routes, Route } from "react-router-dom";

import AppBar from "./components/AppBar";

import Home from "./pages/Home";
import Create from "./pages/Create";
import View from "./pages/View";
import Edit from "./pages/Edit";

function App() {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/view" element={<View />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
