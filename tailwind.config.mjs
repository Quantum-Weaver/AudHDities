// tailwind.config.js
// MANUAL - Thin wrapper around generated config
// DO NOT duplicate colors, animations, etc. here.
// Only add project-specific overrides or plugins.

import generatedConfig from './tailwind.generated.config.mjs';

/** @type {import('tailwindcss').Config} */
export default {
  // Extend the generated config, don't replace it
  ...generatedConfig,
  
  // Override content paths if needed (project-specific)
  content: [
    ...(generatedConfig.content || []),
    // Add any manual content paths here
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  // Add project-specific plugins
  plugins: [
    ...(generatedConfig.plugins || []),
    // require('@tailwindcss/forms'), // Example
  ],
  
  // Add project-specific safelist (classes that must not be purged)
  safelist: [
    ...(generatedConfig.safelist || []),
    // Add manual safelist entries here
    'text-star-dust',
    'bg-deep-space',
  ],
};