import {Request, Response, NextFunction} from 'express';

export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.session?.userId) {
        next();
    } else {
        return res.sendStatus(401);
    }
};