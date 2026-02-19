import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalScripts } from '../hooks/useGlobalScripts';
import { getConfig, saveSessionState, getSessionState } from '../services/nlxConfigService';

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
  const sessionId = useRef(null);
  const config = useRef(getConfig());
  const navigate = useNavigate();

  // Generate or retrieve conversation ID with localStorage persistence
  if (!sessionId.current) {
    const savedState = getSessionState();
    sessionId.current = savedState?.conversationId || 
      (crypto?.randomUUID ? crypto.randomUUID() : `conv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
    
    // Save session state to localStorage
    saveSessionState({
      conversationId: sessionId.current,
      initialized: false
    });
    
    console.log('NLX Conversation ID:', sessionId.current);
  }

  const handleNavigation = (action, destination, destinationUrls) => {
    console.log('NLX Navigation:', { action, destination, destinationUrls });
    
    switch (action) {
      case 'page_next':
        navigate(1);
        break;
      case 'page_previous':
        navigate(-1);
        break;
      case 'page_custom':
      case 'Navigation':
        // If destination is provided, use it directly or look it up in destinationUrls
        let target = destination;
        
        // If no destination but we have destinationUrls, try to find a valid target
        if (!target && destinationUrls) {
          // Look for the first non-# value that's not empty string
          for (const [key, value] of Object.entries(destinationUrls)) {
            if (value && value !== '#' && key !== '') {
              target = value;
              break;
            }
          }
        } else if (target && destinationUrls?.[target]) {
          // If destination is a key in destinationUrls, resolve it
          target = destinationUrls[target];
        }
        
        if (!target || target === '#') {
          console.log('No valid navigation target');
          return;
        }
        
        if (target.startsWith('/')) {
          navigate(target);
        } else {
          window.location.href = target;
        }
        break;
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
      if (nlxInstance.current?.teardown) {
        nlxInstance.current.teardown();
        nlxInstance.current = null;
      } else if (nlxInstance.current?.destroy) {
        nlxInstance.current.destroy();
        nlxInstance.current = null;
      }

      const { create } = await import("https://unpkg.com/@nlxai/touchpoint-ui/lib/index.js?module");
      
      nlxInstance.current = await create({
        config: {
          applicationUrl: config.current.applicationUrl,
          headers: {
            "nlx-api-key": config.current.apiKey
          },
          languageCode: config.current.languageCode,
          conversationId: sessionId.current
        },
        input: "voiceMini",
        bidirectional: {
          navigation: handleNavigation
        },
        ui: {
          persistent: true,
          minimized: false
        }
      });

      window.nlxInitialized = true;
      console.log('NLX initialized successfully');
      
      // Update session state.
      saveSessionState({
        conversationId: sessionId.current,
        initialized: true,
        lastActivity: Date.now()
      });
      
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

    // Cleanup only on app unmount.
    return () => {
      console.log('NLXProvider unmounting - cleaning up...');
      try {
        if (nlxInstance.current?.teardown) {
          nlxInstance.current.teardown();
        } else if (nlxInstance.current?.destroy) {
          nlxInstance.current.destroy();
        }
        nlxInstance.current = null;
        window.nlxInitialized = false;
      } catch (e) {
        console.warn('Error destroying NLX instance on unmount:', e);
      }
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