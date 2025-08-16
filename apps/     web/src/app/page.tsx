"use client"

import { useEffect, useState } from "react"
import { parseTpn } from "@/lib/tpn"
import { TpnFile } from "@/types/tpn"
import { getFirestore, collection, setDoc, doc, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-hooks-web"

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
)

function Hit({ hit }: any) {
  return <div className="p-3 border rounded"><b>{hit.name}</b> — {hit.description}</div>
}

export default function Home() {
  const [files, setFiles] = useState<TpnFile[]>([])

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return
    const tpn = await parseTpn(e.target.files[0])
    await setDoc(doc(db, "tpnFiles", tpn.id), tpn)
    await load()
    alert("Uploaded (emulator) + Functions จะ sync Algolia ให้")
  }

  async function load() {
    const snap = await getDocs(collection(db, "tpnFiles"))
    const list = snap.docs.map(d => d.data() as TpnFile)
    setFiles(list)
  }

  useEffect(() => { load() }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">ScanzaClip — TPN Manager (Emulator)</h1>

      <input type="file" accept=".tpn,application/json" onChange={onFile} />

      <div>
        <h2 className="text-xl font-semibold mt-6">All TPN (Firestore)</h2>
        <ul className="mt-2 space-y-2">
          {files.map(f => <li key={f.id} className="border p-3 rounded">{f.name} — {f.description}</li>)}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-6">Search (Algolia)</h2>
        <InstantSearch searchClient={searchClient} indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX!}>
          <SearchBox placeholder="ค้นหา .tpn..." />
          <div className="mt-3"><Hits hitComponent={Hit} /></div>
        </InstantSearch>
      </div>
    </div>
  )
}
