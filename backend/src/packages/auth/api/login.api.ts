import {Request, Response} from 'express';
import {prisma} from '@/database/prisma';
import logger from '@/core/logger';
import {validateUser} from '@/packages/auth/logic/validate-user';

export const loginApi = async (req: Request, res: Response) => {
    if (req.session.userId) {
        return res.status(400).send({
            message: 'Already logged in.'
        });
    }

    if (!req?.body?.email || !req?.body?.password) {
        return res.status(400).send({
            message: 'Missing parameters.'
        });
    }

    const {email, password} = req.body;

    try {
        if (!await validateUser(email, password)) {
            return res.status(400).send({
                message: 'Wrong email or password.'
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        req.session.userId = user.id;
        req.session.email = user.email;
        req.session.firstName = user.firstName;
        req.session.lastName = user.lastName;
        req.session.save();
        return res.json({
            loggedIn: true,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        })
    }  catch (e) {
        logger.error('Error while trying to log in, destroying session', e);
        req.session.destroy((err) => {
            if (err) {
                logger.error(err);
            }
        });
        return res.status(500).send({
            message: 'An error has occurred.'
        });
    }
}