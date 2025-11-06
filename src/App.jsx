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
import { NLXProvider, useNLXContext } from './contexts/NLXProvider'
import NLXDebug from './components/NLXDebug'
import './nlx-widget.css'

function AppContent() {
  const location = useLocation();
  const { ensureVisibility } = useNLXContext();

  useEffect(() => {
    const timer = setTimeout(ensureVisibility, 300);
    return () => clearTimeout(timer);
  }, [location.pathname, ensureVisibility]);

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

function App() {
  return (
    <NLXProvider>
      <AppContent />
    </NLXProvider>
  )
}

export default App
