import React, { useEffect, useState } from 'react';

const NLXDebug = () => {
  const [status, setStatus] = useState({
    initialized: false,
    widgetFound: false,
    visible: false
  });

  useEffect(() => {
    const checkStatus = () => {
      const selectors = [
        '[data-nlx-widget]',
        '.nlx-widget',
        '#nlx-widget',
        '.nlx-touchpoint',
        'iframe[src*="nlx"]'
      ];

      let widget = null;
      for (const selector of selectors) {
        widget = document.querySelector(selector);
        if (widget) break;
      }

      setStatus({
        initialized: !!window.nlxInitialized,
        widgetFound: !!widget,
        visible: widget ? 
          window.getComputedStyle(widget).display !== 'none' && 
          window.getComputedStyle(widget).visibility !== 'hidden' : false
      });
    };

    checkStatus();
    const interval = setInterval(checkStatus, 2000);

    return () => clearInterval(interval);
  }, []);

  // Only show in development
  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 10000
    }}>
      <div>NLX Status:</div>
      <div>Initialized: {status.initialized ? '✅' : '❌'}</div>
      <div>Widget Found: {status.widgetFound ? '✅' : '❌'}</div>
      <div>Visible: {status.visible ? '✅' : '❌'}</div>
    </div>
  );
};

export default NLXDebug;