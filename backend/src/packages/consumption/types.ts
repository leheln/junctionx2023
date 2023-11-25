export type Base64Image = string;

export interface ConsumptionRaw {
    success: boolean,
    type: 'electricity' | 'water' | 'gas',
    dateStart: string,
    dateEnd: string,
    amount: number
}