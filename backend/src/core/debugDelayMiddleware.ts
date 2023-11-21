import {Request, Response, NextFunction} from 'express';

export const debugDelayMiddleware = (milliseconds: number) => (req: Request, res: Response, next: NextFunction) => {
    setTimeout(() => {
        next()
    }, milliseconds);
};