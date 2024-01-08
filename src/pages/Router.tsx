import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './HomePage/HomePage';
import Detail from './DetailPage/DetailPage';
import CategoryPage from './CategoryPage/CategoryPage';
import LoginPage from './LoginPage/LoginPage';
import SignUpPage from './SignUpPage/SignUpPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/boardgame/:gameId' element={<Detail />} />
        <Route path='/categories/:theme' element={<CategoryPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}
