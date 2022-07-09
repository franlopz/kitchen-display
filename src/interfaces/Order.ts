interface Tag {
  name: string
  qty: number
}

export interface Item {
  categorie: string
  name: string
  qty: number
  uid: string
  status: string
  step: string
  portion: string
  tags: Tag[]
}

export interface Order {
  type: string
  number: number
  waiter: string
  table: string
  color: string
  tid: number
  date: string
  items: Item[]
}
