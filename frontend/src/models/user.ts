import { Address } from "./address"
import { Consumption } from "./consumption"
import { SustainabilityEventAttendance, SustainabilityEvent } from "./event"
import { Pass } from "./pass"
import { StoreItem } from "./storeItem"
import { StoreItemRedeem } from "./storeItemRedeem"

export interface User {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    adressId?: string
    address: Address
    organizedEvents?: SustainabilityEvent[]
    attendances?:     SustainabilityEventAttendance[]
    consumptionsM?:    Consumption[]
    passes?:          Pass[]
    storeItems?:      StoreItem[]
    credits?:         number  
    redeemedStoreItems?: StoreItemRedeem[]
}