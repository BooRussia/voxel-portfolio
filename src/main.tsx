import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PricingApp } from './PricingApp'
import './pricing.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PricingApp />
  </StrictMode>,
)
