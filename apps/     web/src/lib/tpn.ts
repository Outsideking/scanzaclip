import { TpnFile } from "@/types/tpn"

export async function parseTpn(file: File): Promise<TpnFile> {
  const text = await file.text()
  return JSON.parse(text) as TpnFile
}
