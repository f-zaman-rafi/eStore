import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import './index.css'
import { router } from './Routes/Routes';
import AuthProvider from './Providers/AuthProviders';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CartProvider from './Providers/Cart/CartProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const queryClient = new QueryClient()
// Your Stripe public key (replace this with your own key)
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <Elements stripe={stripePromise}>
              <RouterProvider router={router} />
            </Elements>
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
)
