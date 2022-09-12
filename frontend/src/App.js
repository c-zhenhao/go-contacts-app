import "./App.css";

import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import AppBar from "./components/AppBar";

import Home from "./pages/Home";
import Create from "./pages/Create";
import View from "./pages/View";
import Edit from "./pages/Edit";

function App() {
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`submitted`);
    setToggle(!toggle);
    // setSearch("");
  };
  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };

  return (
    <>
      <AppBar
        search={search}
        handleSearchChange={handleSearchChange}
        handleSubmit={handleSubmit}
      />
      <Routes>
        <Route path="/" element={<Home search={search} toggle={toggle} />} />
        <Route path="/create" element={<Create />} />
        <Route path="/view/:contactId" element={<View />} />
        <Route path="/edit/:contactId" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
