import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Aboutus from "../Routes/Aboutus";
import Auth from "../Routes/Auth";
import Home from "../Routes/Home";
import Recommendation from "../Routes/Recommendation";
import RecommendationIntro from "../Routes/RecommendationIntro";
import RecommendationResult from "../Routes/RecommendationResult";
import RecommendationResultTest from "../Routes/RecommendationResultTest";
import ResultHistory from "../Routes/ResultHistory";
import DIY from "../Routes/ResultHistory/DIY";
import Student from "../Routes/ResultHistory/Student";
import Developer from "../Routes/ResultHistory/Developer";
import Lab from "../Routes/Lab";
import Admin from "../Routes/Admin";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/Aboutus" component={Aboutus}></Route>
      <Route
        exact
        path="/RecommendationIntro"
        component={RecommendationIntro}
      ></Route>
      <Route exact path="/Recommendation" component={Recommendation}></Route>
      <Route
        exact
        path="/RecommendationResult/:univ_name/:univ_lat/:univ_lon/:Q2Answer/:Q3Answer/:Q4Answer/:Q5Answer/:w1/:w2/:w3/:w4/:w5/:history"
        component={RecommendationResult}
      ></Route>
      <Route exact path="/Test" component={RecommendationResultTest}></Route>
      {localStorage.getItem("user_no") ? (
        <Route exact path="/ResultHistory" component={ResultHistory}></Route>
      ) : (
        <Route exact path="/" component={Home}></Route>
      )}
      <Route exact path="/DIYHistory" component={DIY}></Route>
      <Route exact path="/StudentHistory" component={Student}></Route>
      <Route exact path="/DeveloperHistory" component={Developer}></Route>
      <Route exact path="/Lab" component={Lab}></Route>
      {localStorage.getItem("user_no") ? (
        <Route exact path="/" component={Home}></Route>
      ) : (
        <Route exact path="/Auth" component={Auth}></Route>
      )}

      <Route exact path="/12284!232842A244" component={Admin}></Route>
      <Navigate from="*" to="/" />
    </Routes>
  );
};

export default RoutesComponent;
