import { SustainabilityEvent } from "./event"
import { User } from "./user"

export interface Address {
    id?: string
    zipCode: string
    city: string
    street: string
    streetNumber: number
    events?: SustainabilityEvent[]
    users?: User[]
}