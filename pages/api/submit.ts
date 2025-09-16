import type { NextApiRequest, NextApiResponse } from 'next'
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log('Form data received')
    res.status(200).json({ message: '✅ Mock received! Pack would be generated here.' })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
