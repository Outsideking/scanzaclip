import algoliasearch from "algoliasearch"
import { TpnFile } from "@/types/tpn"

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.ALGOLIA_ADMIN_KEY!
)

const index = client.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX!)

export async function syncTpnToAlgolia(tpn: TpnFile) {
  await index.saveObject({
    objectID: tpn.id,
    ...tpn,
  })
}
