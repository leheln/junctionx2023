import { User } from "./user"

export interface Pass {
  id?: string
  userId: string
  user?: User
  type:  PassType
  dateStart: Date
  dateEnd:   Date
  credits:   number
}

export enum PassType {
    PUBLIC_TRANSPORT = "PUBLIC_TRANSPORT",
    BIKE_PASS = "BIKE_PASS"
}