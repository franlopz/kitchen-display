interface Tag {
  quantity: number
  _id: string
  name: string
}

export interface Item {
  _id: string
  category: string
  name: string
  quantity: number
  uid: string
  status: 'active' | 'prepared' | 'voided'
  isGift: boolean
  portion: string
  tags: Tag[]
}

interface Type {
  name: string
  color: string
}
export interface Order {
  _id: string
  account: string
  area: string
  screen: string
  type: Type
  isDone: boolean
  isVoided: boolean
  number: number
  table: string
  seller: string
  tid: number
  orders: Item[]
  createdAt: string
  updatedAt: string
}
