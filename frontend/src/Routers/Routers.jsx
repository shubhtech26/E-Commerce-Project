// import { Navigation } from "mdi-material-ui";
import React from "react";
import { Routes, Route } from "react-router-dom";


const Routers = () => {
  return (
    <div>
        <div>
             <Navigation/>
        </div>
       <div className="">
        <Routes>

        <Route path="/" element={<Homepage/>}></Route>

      </Routes>
       </div>
      
    </div>
  );
};

export default Routers;
