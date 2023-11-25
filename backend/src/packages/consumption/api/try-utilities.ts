import {Request, Response} from 'express';
import {recognize} from '@/packages/consumption';

export const tryUtilitiesApi = async (req: Request, res: Response) => {
    try {
        const {type, dateStart, dateEnd, amount} = await recognize(req.body.image)
        return res.json({
            type: type,
            dateStart: new Date(dateStart).toISOString(),
            dateEnd: new Date(dateEnd).toISOString(),
            amount: +amount
        })
    } catch (e) {
        return res.sendStatus(500);
    }
}