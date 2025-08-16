import { initializeApp } from "firebase/app"
import { getFirestore, doc, setDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytes } from "firebase/storage"
import { TpnFile } from "@/types/tpn"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)

// ✅ อัพโหลดไฟล์ .tpn
export async function uploadTpnFile(tpn: TpnFile) {
  // เก็บ metadata ใน Firestore
  await setDoc(doc(db, "tpnFiles", tpn.id), tpn)

  // เก็บไฟล์จริงใน Storage
  const blob = new Blob([JSON.stringify(tpn, null, 2)], { type: "application/json" })
  const storageRef = ref(storage, `tpn/${tpn.id}.tpn`)
  await uploadBytes(storageRef, blob)
}

import { syncTpnToAlgolia } from "./algolia"

export async function uploadTpnFile(tpn: TpnFile) {
  // Firestore
  await setDoc(doc(db, "tpnFiles", tpn.id), tpn)

  // Storage
  const blob = new Blob([JSON.stringify(tpn, null, 2)], { type: "application/json" })
  const storageRef = ref(storage, `tpn/${tpn.id}.tpn`)
  await uploadBytes(storageRef, blob)

  // Algolia
  await syncTpnToAlgolia(tpn)
}
