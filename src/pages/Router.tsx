import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./HomePage";
import Detail from "./DetailPage";
import AllGames from "./AllGames";
import CategoriesPage from "./CategoriesPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boardgame" element={<AllGames />} />
        <Route path="/boardgame/:gameId" element={<Detail />} />
        <Route path="/boardgame/categories" element={<CategoriesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
