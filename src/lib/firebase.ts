import { collection, getDocs } from "firebase/firestore"
import { db } from "./firebase"
import { TpnFile } from "@/types/tpn"

// ✅ ดึงรายการไฟล์ทั้งหมด
export async function listTpnFiles(): Promise<TpnFile[]> {
  const snapshot = await getDocs(collection(db, "tpnFiles"))
  return snapshot.docs.map(doc => doc.data() as TpnFile)
}
