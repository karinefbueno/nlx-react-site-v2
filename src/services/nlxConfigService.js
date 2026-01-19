// Local storage keys
const CONFIG_KEY = 'nlx_touchpoint_config';
const SESSION_KEY = 'nlx_session_state';

// Default configuration
const DEFAULT_CONFIG = {
  applicationUrl: "https://bots.studio.nlx.ai/c/Bd1ZQVnU4R5wi1BszG0mA/dCGt0lsdeAWLOhSlkHgeS",
  apiKey: "I-ifvAVOXEVhNnsjg5_1hd8D",
  languageCode: "en-US"
};

/**
 * Save NLX configuration to localStorage
 */
export const saveConfig = (config) => {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (error) {
    console.error('Failed to save NLX config:', error);
  }
};

/**
 * Get NLX configuration from localStorage
 */
export const getConfig = () => {
  try {
    const stored = localStorage.getItem(CONFIG_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate required fields
      if (parsed.applicationUrl && parsed.apiKey && parsed.languageCode) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Failed to get NLX config:', error);
  }
  return DEFAULT_CONFIG;
};

/**
 * Save session state to localStorage
 */
export const saveSessionState = (state) => {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      ...state,
      timestamp: Date.now()
    }));
  } catch (error) {
    console.error('Failed to save session state:', error);
  }
};

/**
 * Get session state from localStorage
 */
export const getSessionState = () => {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Check if session is not too old (24 hours)
      if (parsed.timestamp && (Date.now() - parsed.timestamp) < 24 * 60 * 60 * 1000) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Failed to get session state:', error);
  }
  return null;
};

/**
 * Clear session state
 */
export const clearSessionState = () => {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Failed to clear session state:', error);
  }
};