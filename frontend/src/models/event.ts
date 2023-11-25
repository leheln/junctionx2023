import { Address } from "./address"
import { User } from "./user"

export interface SustainabilityEvent {
    id?: string
    credits: number,
    date: Date,
    description: string,
    image: string,
    title: string,
    type: SustainabilityEventType,
    organizerId?: string
    organizer?: User
    addressId?: string
    address: Address
    attendance?: SustainabilityEventAttendance[]
}

export enum SustainabilityEventType {
    GARBAGE_COLLECTION,
    TREE_PLANTING,
    WORKSHOP
}

export interface SustainabilityEventAttendance {
  id?:  string
  eventId:  string
  event?: SustainabilityEvent
  userId:    string
  user?: User
  completed: boolean
}