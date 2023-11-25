import {ConsumptionRaw} from '@/packages/consumption/types';
import {prisma} from '@/database/prisma';

export async function addConsumption (userId: string, consumptionRaw: ConsumptionRaw) {
    try {
        await prisma.consumption.create({
            data: {
                userId: userId,
                type: consumptionRaw.type,
                dateStart: consumptionRaw.dateStart,
                dateEnd: consumptionRaw.dateEnd,
                amount: consumptionRaw.amount,
                credits: 100, // TODO
            }
        });
    } catch {
        throw new Error('Error adding consumption to database')
    }
}
