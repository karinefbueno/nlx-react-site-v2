import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalScripts } from '../hooks/useGlobalScripts';

const NLXContext = createContext();

export const useNLXContext = () => {
  const context = useContext(NLXContext);
  if (!context) {
    throw new Error('useNLXContext must be used within NLXProvider');
  }
  return context;
};

export const NLXProvider = ({ children }) => {
  const nlxInstance = useRef(null);
  const isInitializing = useRef(false);
  const navigate = useNavigate();

  const handleCustomCommand = (action, payload) => {
    console.log('NLX Custom Command:', action, payload);
    
    if (action === 'nlx:destination' && payload?.uri) {
      console.log('Navigating to:', payload.uri);
      navigate(payload.uri);
    }
  };

  const ensureVisibility = () => {
    try {
      const selectors = [
        '[data-nlx-widget]',
        '.nlx-widget',
        '#nlx-widget',
        '.nlx-touchpoint',
        '[class*="nlx"]'
      ];

      let widget = null;
      for (const selector of selectors) {
        widget = document.querySelector(selector);
        if (widget) break;
      }

      if (widget) {
        widget.style.display = 'block';
        widget.style.visibility = 'visible';
        widget.style.opacity = '1';
        widget.style.pointerEvents = 'auto';
        widget.style.zIndex = '9999';
        
        console.log('NLX widget visibility ensured');
        return true;
      }
      
      return false;
    } catch (error) {
      console.warn('Error ensuring NLX visibility:', error);
      return false;
    }
  };

  const initializeNLX = async () => {
    if (isInitializing.current || (window.nlxInitialized && nlxInstance.current)) {
      return;
    }

    isInitializing.current = true;

    try {
      if (nlxInstance.current?.destroy) {
        nlxInstance.current.destroy();
        nlxInstance.current = null;
      }

      const { create } = await import("https://unpkg.com/@nlxai/touchpoint-ui/lib/index.js?module");
      
      nlxInstance.current = await create({
        config: {
          applicationUrl: "https://apps.nlx.ai/c/zdJAiYo8xgLBDSnaFlSOa/ZpXp912JV_Cct9ZvNw4zQ",
          headers: {
            "nlx-api-key": "9X4tdtxGP2enr0is3xASmojH"
          },
          languageCode: "en-US",
        },
        input: "voiceMini",
        bidirectional: {
          custom: handleCustomCommand
        },
        ui: {
          persistent: true,
          minimized: false
        }
      });

      window.nlxInitialized = true;
      console.log('NLX initialized successfully');
      
      setTimeout(ensureVisibility, 500);

    } catch (error) {
      console.error('NLX initialization failed:', error);
    } finally {
      isInitializing.current = false;
    }
  };

  // Initialize once when provider mounts
  useEffect(() => {
    initializeNLX();

    // Cleanup only on app unmount
    const handleBeforeUnload = () => {
      try {
        if (nlxInstance.current?.destroy) {
          nlxInstance.current.destroy();
        }
      } catch (e) {
        console.warn('Error destroying NLX instance', e);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const contextValue = {
    ensureVisibility,
    isInitialized: () => !!window.nlxInitialized && !!nlxInstance.current
  };

  return (
    <NLXContext.Provider value={contextValue}>
      {children}
    </NLXContext.Provider>
  );
};