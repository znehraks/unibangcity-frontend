import React from "react";
import { Route, Routes } from "react-router-dom";
import Aboutus from "../screens/Aboutus";
import Recommendation from "../screens/Recommendation";
import Auth from "../screens/Auth";
import History from "../screens/History";
import Home from "../screens/Home";

const RouterComponent = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/Aboutus" element={<Aboutus />} />
      <Route exact path="/Recommendation" element={<Recommendation />} />
      <Route exact path="/Auth" element={<Auth />} />
      <Route exact path="/History" element={<History />} />
      <Route exact path="*" element={<h1>NOT FOUND</h1>} />
    </Routes>
  );
};

export default RouterComponent;
