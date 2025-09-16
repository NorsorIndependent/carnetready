import React, { useState } from 'react'
import config from '../config'
export default function Home() {
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    setUploading(true)
    const res = await fetch('/api/submit', { method: 'POST', body: data })
    const json = await res.json()
    setUploading(false)
    setMessage(json.message)
  }
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="mx-auto max-w-3xl px-4 py-14">
        <h1 className="text-4xl font-bold">CarnetReady</h1>
        <p className="mt-4 text-lg">Upload your gear list → get a carnet-ready Submission Pack in minutes.</p>
        <a href={config.templateUrl} className="mt-6 inline-block px-4 py-2 border rounded-lg">Download Template</a>
        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 border rounded-xl p-6">
          <input name="tripName" placeholder="Trip Name" className="border p-2 rounded" required />
          <input name="email" type="email" placeholder="Contact Email" className="border p-2 rounded" required />
          <input name="departDate" type="date" className="border p-2 rounded" required />
          <input name="returnDate" type="date" className="border p-2 rounded" required />
          <input name="countries" placeholder="Countries (US,GB,FR)" className="border p-2 rounded" required />
          <input name="file" type="file" accept=".xlsx,.xls,.csv" className="border p-2" required />
          <button type="submit" className="bg-black text-white px-4 py-2 rounded" disabled={uploading}>
            {uploading ? 'Processing…' : 'Submit'}
          </button>
        </form>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </section>
    </main>
  )
}
