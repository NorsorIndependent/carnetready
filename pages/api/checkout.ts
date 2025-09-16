// /pages/api/checkout.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const origin = req.headers.origin || 'https://carnetready.vercel.app'
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
      // For now, send them back to home after payment.
      // (We can change this to /upload next.)
      success_url: `${origin}/?paid=1`,
      cancel_url: `${origin}/`,
    })
    res.status(200).json({ url: session.url })
  } catch (e: any) {
    console.error(e)
    res.status(500).json({ error: 'Stripe error' })
  }
}
