export interface TpnFile {
  id: string
  name: string
  description: string
  createdAt: number
  tags: string[]
  data: Record<string, any>
}
