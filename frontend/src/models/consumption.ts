export interface Consumption {
    id?: string,
    credit: number,
    image: string,
    description: string,
    userId: string
    dateStart: Date
    dateEnd: Date
    type: ConsumptionType
}

export enum ConsumptionType {
    ELECTRICITY,
    WATER,
    GAS
}