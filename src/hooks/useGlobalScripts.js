import { useEffect } from 'react';

let scriptsLoaded = false;

export const useGlobalScripts = () => {
  useEffect(() => {
    if (scriptsLoaded) return;

    const scripts = [
      "/js/jquery.min.js",
      "/js/popper.min.js", 
      "/js/bootstrap.bundle.min.js",
      "/js/jquery-3.0.0.min.js",
      "/js/plugin.js",
      "/js/jquery.mCustomScrollbar.concat.min.js",
      "/js/custom.js"
    ];

    scripts.forEach((src) => {
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
      }
    });

    scriptsLoaded = true;
  }, []);
};