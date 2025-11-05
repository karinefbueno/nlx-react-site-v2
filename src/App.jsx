import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Index'
import About from './pages/About'
import Client from './pages/Client'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import Services from './pages/Services'

function App() {
  useEffect(() => {
    // Verifica se já foi inicializado para evitar duplicação
    if (window.nlxInitialized) {
      return;
    }

    const initNLX = async () => {
      try {
        const { create } = await import("https://unpkg.com/@nlxai/touchpoint-ui/lib/index.js?module");
        await create({
          config: {
            applicationUrl: "https://apps.nlx.ai/c/zdJAiYo8xgLBDSnaFlSOa/ZpXp912JV_Cct9ZvNw4zQ",
            headers: {
              "nlx-api-key": "9X4tdtxGP2enr0is3xASmojH"
            },
            languageCode: "en-US",
          },
          input: "voiceMini",
          bidirectional: {}
        });
        
        window.nlxInitialized = true;
        console.log('NLX initialized successfully');
      } catch (error) {
        console.error('Error initializing NLX:', error);
      }
    };

    initNLX();
  }, []);
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
