import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./HomePage";
import Detail from "./DetailPage";
import AllGames from "./AllGames";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boardgames" element={<AllGames />} />
        <Route path="game/:gameId" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}
