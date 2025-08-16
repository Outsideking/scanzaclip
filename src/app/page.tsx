"use client"

import { useState, useEffect } from "react"
import { loadTpn } from "@/lib/tpn"
import { uploadTpnFile, listTpnFiles } from "@/lib/firebase"
import { TpnFile } from "@/types/tpn"

export default function HomePage() {
  const [tpn, setTpn] = useState<TpnFile | null>(null)
  const [files, setFiles] = useState<TpnFile[]>([])

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return
    const file = e.target.files[0]
    const parsed = await loadTpn(file)
    setTpn(parsed)
    await uploadTpnFile(parsed)
    alert("✅ Upload เสร็จสิ้น")
    loadFiles()
  }

  async function loadFiles() {
    const data = await listTpnFiles()
    setFiles(data)
  }

  useEffect(() => {
    loadFiles()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">ScanzaClip - .tpn Manager</h1>

      <input type="file" accept=".tpn" onChange={handleFileChange} className="mt-4" />

      {tpn && (
        <div className="mt-4 p-4 border rounded">
          <p><b>อัพโหลดล่าสุด:</b> {tpn.name}</p>
        </div>
      )}

      <h2 className="text-lg font-bold mt-6">📂 ไฟล์ทั้งหมด</h2>
      <ul className="mt-2 space-y-2">
        {files.map(f => (
          <li key={f.id} className="p-3 border rounded">
            <b>{f.name}</b> — {f.description}
          </li>
        ))}
      </ul>
    </div>
  )
}
