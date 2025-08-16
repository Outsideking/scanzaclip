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
