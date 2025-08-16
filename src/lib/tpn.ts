import { TpnFile } from "@/types/tpn"

// ✅ อ่านไฟล์ .tpn (เป็น JSON)
export async function loadTpn(file: File): Promise<TpnFile> {
  const text = await file.text()
  return JSON.parse(text) as TpnFile
}

// ✅ สร้างไฟล์ .tpn สำหรับดาวน์โหลด
export function saveTpn(tpn: TpnFile): Blob {
  const json = JSON.stringify(tpn, null, 2)
  return new Blob([json], { type: "application/json" })
}
