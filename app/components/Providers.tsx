'use client'

import { ReactNode } from 'react'
import { CartProvider as USCProvider } from 'use-shopping-cart'


export default function CartProvider({ children }: { children: ReactNode }) {

  return (
    <USCProvider 
    mode='payment' 
    cartMode='client-only' 
    stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string}
    successUrl='http://localhhost:3000/stripe/success'
    cancelUrl='http://localhhost:3000/stripe/error'
    currency='usd'
    billingAddressCollection={false}
    shouldPersist={true}
    language='en-US'
    >
      {children}
    </USCProvider>

  )
}