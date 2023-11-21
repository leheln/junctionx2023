import {Request, Response} from 'express';

export const whoamiApi = async (req: Request, res: Response) => {
    if (req.session.userId) {
        return res.json({
            loggedIn: true,
            email: req.session.email,
            firstName: req.session.firstName,
            lastName: req.session.lastName
        });
    } else {
        return res.json({
            loggedIn: false
        });
    }
};