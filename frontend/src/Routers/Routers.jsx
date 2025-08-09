// import { Navigation } from "mdi-material-ui";
import React from "react";
import { Routes, Route } from "react-router-dom";

// Remove invalid reference to Navigation/Homepage to avoid runtime import of undefined object

const Routers = () => {
  return (
    <Routes>
      {/* This file is unused by App. Keep minimal valid Routes to prevent object rendering errors if imported elsewhere. */}
      <Route path="/" element={<div />} />
    </Routes>
  );
};

export default Routers;
