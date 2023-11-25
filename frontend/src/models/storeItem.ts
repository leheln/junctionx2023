import { StoreItemRedeem } from "./storeItemRedeem"
import { User } from "./user"

export interface StoreItem {
    id?: string
    credit: number
    image: string
    title: string
    description: string
    barcode: string
    userId: string
    creator?: User
    redeemers?: StoreItemRedeem[]
}

