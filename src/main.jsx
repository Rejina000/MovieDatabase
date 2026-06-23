import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import navbar from "./Components/navbar";
import MovieGrid from "./Components/MovieGrid";
import movieCard from "./Components/movieCard";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
