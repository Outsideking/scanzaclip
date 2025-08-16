export interface TpnFile {
  id: string
  name: string
  description: string
  ownerId: string
  tags: string[]
  visibility: "private" | "public"
  createdAt: number
  data: Record<string, any>
}
