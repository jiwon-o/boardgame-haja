import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./HomePage";
import Detail from "./DetailPage";
import CategoryPage from "./CategoryPage";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boardgame/:gameId" element={<Detail />} />
        <Route path="/categories/:theme" element={<CategoryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}
