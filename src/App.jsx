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
import './nlx-widget.css'

function App() {
  const location = useLocation();
  const { initializeNLX, ensureVisibility, isInitialized } = useNLX();

  useEffect(() => {
    initializeNLX();
  }, [initializeNLX]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isInitialized()) {
        console.log('NLX not initialized, reinitializing...');
        initializeNLX();
      } else {
        ensureVisibility();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname, ensureVisibility, initializeNLX, isInitialized]);
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
    </>
  )
}

export default App
