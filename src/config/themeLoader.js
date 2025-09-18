import { themes, getTheme, validateTheme } from './themes/themes';

// Cache for loaded themes
const themeCache = new Map();

// Dynamic theme loader
export class ThemeLoader {
  constructor() {
    // Pre-load all themes into cache
    Object.keys(themes).forEach(themeName => {
      themeCache.set(themeName, themes[themeName]);
    });
  }

  // Load a theme by name
  async loadTheme(themeName) {
    if (!validateTheme(themeName)) {
      console.warn(`Theme '${themeName}' not found, falling back to classic`);
      return this.loadTheme('classic');
    }

    // Check cache first
    if (themeCache.has(themeName)) {
      return themeCache.get(themeName);
    }

    // For now, all themes are pre-loaded, but this structure allows for dynamic imports
    // In the future, you could do:
    // const themeModule = await import(`./themes/${themeName}.js`);
    // const theme = themeModule.default;
    // themeCache.set(themeName, theme);
    // return theme;

    return getTheme(themeName);
  }

  // Get all available theme names
  getAvailableThemes() {
    return Object.keys(themes);
  }

  // Preload all themes
  async preloadAllThemes() {
    const themeNames = this.getAvailableThemes();
    const loadPromises = themeNames.map(name => this.loadTheme(name));
    await Promise.all(loadPromises);
    console.log(`Preloaded ${themeNames.length} themes`);
  }

  // Clear theme cache
  clearCache() {
    themeCache.clear();
  }
}

// Create singleton instance
export const themeLoader = new ThemeLoader();

// Convenience functions
export const loadTheme = (themeName) => themeLoader.loadTheme(themeName);
export const getAvailableThemes = () => themeLoader.getAvailableThemes();
export const preloadThemes = () => themeLoader.preloadAllThemes();