import { User } from "./user"

export interface StoreItem {
    id?: string
    credit: number
    image: string
    title: string
    description: string
    userId: string
    creator?: User
}
