import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from '../Pages/user/Home';

export default function UserRoutes () {
  
  return (
    <BrowserRouter basename='/jet-jams'>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
  </BrowserRouter>
  )
}

