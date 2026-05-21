import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initAmplitude } from './lib/amplitude'

// Initialize Amplitude
initAmplitude();

createRoot(document.getElementById("root")!).render(<App />);

