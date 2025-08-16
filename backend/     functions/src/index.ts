import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
import algoliasearch from "algoliasearch"

admin.initializeApp()
const db = admin.firestore()

// Algolia client (ใช้ server key)
const algoliaClient = algoliasearch(
  process.env.ALGOLIA_APP_ID || process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.ALGOLIA_ADMIN_KEY!
)
const tpnIndex = algoliaClient.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX || "tpn_files")

// ✅ เมื่อมีการสร้าง/แก้ไข tpnFiles → sync Algolia + บันทึก audit
export const onTpnWrite = functions.firestore
  .document("tpnFiles/{tpnId}")
  .onWrite(async (change, ctx) => {
    const tpnId = ctx.params.tpnId
    if (!change.after.exists) {
      await tpnIndex.deleteObject(tpnId)
      await logAudit("tpnFiles", tpnId, "delete", change.before.data() || {})
      return
    }
    const data = change.after.data()
    await tpnIndex.saveObject({ objectID: tpnId, ...data })
    await logAudit("tpnFiles", tpnId, change.before.exists ? "update" : "create", data)
  })

// ✅ API: ออกใบอนุญาต (license) สำหรับ tpn/project
export const issueLicense = functions.https.onCall(async (payload, context) => {
  // ตรวจ role
  const uid = context.auth?.uid
  if (!uid) throw new functions.https.HttpsError("unauthenticated", "Sign in required")

  const { entityId, entityType, assigneeUid, durationDays } = payload
  // TODO: ตรวจสิทธิ์จริงจังจาก roles/permissions

  const licenseRef = db.collection("licenses").doc()
  const now = admin.firestore.Timestamp.now()
  const expiresAt = admin.firestore.Timestamp.fromMillis(now.toMillis() + (durationDays || 365) * 24 * 3600 * 1000)

  const doc = {
    id: licenseRef.id,
    entityId,
    entityType, // "tpn" | "project"
    ownerId: uid,
    assigneeIds: [assigneeUid],
    issuedAt: now,
    expiresAt,
    status: "active"
  }
  await licenseRef.set(doc)
  await logAudit("licenses", doc.id, "create", doc)
  return doc
})

// ✅ Helper บันทึก audit
async function logAudit(collection: string, id: string, action: string, data: any) {
  const ref = db.collection("audits").doc()
  await ref.set({
    id: ref.id,
    at: admin.firestore.FieldValue.serverTimestamp(),
    collection,
    docId: id,
    action,
    data
  })
}
