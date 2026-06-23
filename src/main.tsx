import React from 'react';
import { createRoot } from 'react-dom/client';
// Design-system CSS: Tamagui's reset (removes native <button>/<input> chrome so
// Tabs/Buttons render as designed) + the Inter web fonts. Without the reset,
// native elements like Tabs.Tab keep default OS button styling.
import './design-system/css/reset.css';
import './design-system/css/fonts.css';
import 'react-native-vector-icons/Fonts/MaterialIcons.ttf';
import 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';
import { App } from './App';

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root not found');
createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
