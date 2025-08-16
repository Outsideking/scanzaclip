"use client"

import { useState } from "react"
import { loadTpn } from "@/lib/tpn"
import { uploadTpnFile } from "@/lib/firebase"
import { TpnFile } from "@/types/tpn"

export default function HomePage() {
  const [tpn, setTpn] = useState<TpnFile | null>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return
    const file = e.target.files[0]
    const parsed = await loadTpn(file)
    setTpn(parsed)
    await uploadTpnFile(parsed)
    alert("✅ Upload เสร็จสิ้น")
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">ScanzaClip - Import .tpn</h1>
      <input type="file" accept=".tpn" onChange={handleFileChange} className="mt-4" />
      {tpn && (
        <div className="mt-4 p-4 border rounded">
          <p><b>ID:</b> {tpn.id}</p>
          <p><b>Name:</b> {tpn.name}</p>
          <p><b>Description:</b> {tpn.description}</p>
        </div>
      )}
    </div>
  )
}
