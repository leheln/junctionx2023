export interface Consumption {
    id?: string,
    credits: number,
    userId: string
    dateStart: Date
    dateEnd: Date
    type: ConsumptionType
    amount: number
}

export enum ConsumptionType {
    ELECTRICITY = "ELECTRICITY",
    WATER = "WATER",
    GAS = "GAS"
}