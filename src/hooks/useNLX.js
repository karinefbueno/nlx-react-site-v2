import { useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useNLX = () => {
  const nlxInstance = useRef(null);
  const isInitializing = useRef(false);
  const retryCount = useRef(0);
  const maxRetries = 3;
  const navigate = useNavigate();
  const location = useLocation();

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
        return widget;
      }
      
      return null;
    } catch (error) {
      console.warn('Error ensuring NLX visibility:', error);
      return null;
    }
  }, []);

  // Attempt a programmatic "open" by clicking the widget's button if present
  const tryOpenWidget = useCallback(() => {
    try {
      const widget = ensureVisibility();
      if (!widget) return false;

      // Try several possible button selectors inside the widget
      const btnSelectors = [
        'button',
        '[role="button"]',
        '.nlx-open',
        '.nlx-touchpoint-button',
        '[data-nlx-open]'
      ];

      let btn = null;
      for (const s of btnSelectors) {
        btn = widget.querySelector(s);
        if (btn) break;
      }

      if (btn) {
        // Synthetic click (pointer events + click) to mimic user interaction
        btn.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
        btn.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
        btn.click();
        console.log('Tried to open NLX widget via button click');
        return true;
      }

      // If no button, try clicking the widget root
      widget.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
      widget.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
      widget.click();
      console.log('Tried to open NLX widget via root click');
      return true;
    } catch (e) {
      console.warn('Error trying to open NLX widget:', e);
      return false;
    }
  }, [ensureVisibility]);

  const initializeNLX = useCallback(async () => {
    // Avoid race / double-init
    if (isInitializing.current) return;

    // If global flag exists but instance is missing => allow reinit
    if (window.nlxInitialized && !nlxInstance.current) {
      console.warn('nlxInitialized flag is set but instance is missing — reinitializing');
      window.nlxInitialized = false;
    }

    // If already initialized and instance exists, nothing to do
    if (window.nlxInitialized && nlxInstance.current) {
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
      
      setTimeout(() => {
        ensureVisibility();
        // small delay then try to open so widget is interactive after navigation
        setTimeout(tryOpenWidget, 300);
      }, 500);

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
  }, [ensureVisibility, handleCustomCommand, tryOpenWidget]);

  // Cleanup on unmount: destroy instance and clear global flag
  useEffect(() => {
    return () => {
      try {
        if (nlxInstance.current?.destroy) {
          nlxInstance.current.destroy();
        }
      } catch (e) {
        console.warn('Error destroying NLX instance on unmount', e);
      } finally {
        nlxInstance.current = null;
        window.nlxInitialized = false;
      }
    };
  }, []);

  // Re-open / re-check when route changes
  useEffect(() => {
    if (!window) return;
    // small delay to let DOM settle after navigation
    const t = setTimeout(() => {
      if (nlxInstance.current) {
        tryOpenWidget();
      } else {
        initializeNLX();
      }
    }, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Re-open when user comes back to tab
  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        if (nlxInstance.current) {
          tryOpenWidget();
        } else {
          initializeNLX();
        }
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // lightweight health-check: if global flag present but instance lost, attempt reinit
  useEffect(() => {
    const id = setInterval(() => {
      if (window.nlxInitialized && !nlxInstance.current) {
        console.warn('Detected missing NLX instance despite flag — reinitializing');
        window.nlxInitialized = false;
        initializeNLX();
      }
    }, 3000);
    return () => clearInterval(id);
  }, [initializeNLX]);

  // expose a helper to check running state
  return {
    initializeNLX,
    ensureVisibility,
    tryOpenWidget,
    isInitialized: () => !!window.nlxInitialized && !!nlxInstance.current
  };
};