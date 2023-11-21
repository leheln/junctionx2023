import {Request, Response} from 'express';
import logger from '@/core/logger';

export const logoutApi = async (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            logger.error(err);
            return res.send(500);
        }
    })
    return res.sendStatus(200);
}