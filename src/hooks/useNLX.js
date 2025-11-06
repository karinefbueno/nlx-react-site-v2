import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useNLX = () => {
  const nlxInstance = useRef(null);
  const isInitializing = useRef(false);
  const retryCount = useRef(0);
  const maxRetries = 3;
  const navigate = useNavigate();

  const handleCustomCommand = useCallback((action, payload) => {
    console.log('NLX Custom Command:', action, payload);
    
    if (action === 'nlx:destination' && payload?.uri) {
      console.log('Navigating to:', payload.uri);
      navigate(payload.uri);
    }
  }, [navigate]);

  const ensureVisibility = useCallback(() => {
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
  }, []);

  const initializeNLX = useCallback(async () => {
    if (isInitializing.current || window.nlxInitialized) {
      return;
    }

    if (retryCount.current >= maxRetries) {
      console.error('Max NLX initialization retries reached');
      return;
    }

    isInitializing.current = true;
    retryCount.current++;

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
      retryCount.current = 0;
      
      setTimeout(ensureVisibility, 500);

    } catch (error) {
      console.error(`NLX initialization failed (attempt ${retryCount.current}):`, error);
      
      if (retryCount.current < maxRetries) {
        setTimeout(() => {
          isInitializing.current = false;
          initializeNLX();
        }, 2000 * retryCount.current);
      }
    } finally {
      isInitializing.current = false;
    }
  }, [ensureVisibility]);

  return {
    initializeNLX,
    ensureVisibility,
    isInitialized: () => window.nlxInitialized
  };
};