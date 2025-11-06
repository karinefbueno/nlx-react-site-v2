import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Index'
import About from './pages/About'
import Client from './pages/Client'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import Services from './pages/Services'
import { useNLX } from './hooks/useNLX'
import NLXDebug from './components/NLXDebug'
import './nlx-widget.css'

function App() {
  const location = useLocation();
  const { initializeNLX, ensureVisibility, isInitialized } = useNLX();

  useEffect(() => {
    initializeNLX();
  }, [initializeNLX]);

  useEffect(() => {
    // Garante visibilidade nas trocas de página com múltiplas tentativas
    if (isInitialized()) {
      const timer1 = setTimeout(ensureVisibility, 100);
      const timer2 = setTimeout(ensureVisibility, 500);
      const timer3 = setTimeout(ensureVisibility, 1000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [location.pathname, ensureVisibility, isInitialized]);
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/client" element={<Client />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/services" element={<Services />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <NLXDebug />
    </>
  )
}

export default App
