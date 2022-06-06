import React from "react";
import { Route, Routes } from "react-router-dom";
import CatsList from "./pages/CatsList";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CatsList />} />
      </Routes>
    </div>
  );
}

export default App;
