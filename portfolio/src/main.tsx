import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./pages/variables.css";

import { Home } from './pages/home/Home.tsx'
import { WFC_Overlap } from './pages/wfc_overlap/WFC_Overlap.tsx';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} /> {/* ROTA CORINGA */}
        <Route path="/wfc-overlap" element={<WFC_Overlap />} />
      </Routes>
    
    </BrowserRouter>

  </StrictMode>,
)
