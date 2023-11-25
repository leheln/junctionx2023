import {Request, Response} from 'express';
import {recognize} from '@/packages/consumption';

export const tryUtilitiesApi = async (req: Request, res: Response) => {
    try {
        return res.json(await recognize(req.body.image))
    } catch (e) {
        return res.sendStatus(500);
    }
}