import { Request, Response } from 'express';
import logger from '@/core/logger';
import { prisma } from '@/database/prisma';

export const userGetApi = async (req: Request, res: Response) => {
    const userId = req.params.userId
    if (req.session.userId === userId) {
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            },
        })
        if (user) {
            const { password, ...rest } = user
            return res.json(rest)
        } else {
            return res.status(404).send({
                message: 'User not found'
            });
        }
    } else {
        return res.status(403).send({
            message: 'Forbidden'
        });
    }
}


export const userGetEventsApi = async (req: Request, res: Response) => {
    const userId = req.params.userId
    if (req.session.userId === userId) {
        const events = await prisma.eventAttendance.findMany({
            where: {
                userId: userId,
                event: {
                    date: {
                        gte: new Date(new Date().toUTCString())
                    }
                }
            },
            include: {
                event: true
            }
        })
        return res.json({
            id: userId,
            events
        })
    } else {
        return res.status(403).send({
            message: 'Forbidden'
        });
    }
}

export const userGetConsumptionsApi = async (req: Request, res: Response) => {
    const userId = req.params.userId
    if (req.session.userId === userId) {
        const consumptions = await prisma.consumption.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                dateStart: 'desc'
            }
        })
        return res.json({
            id: userId,
            consumptions
        })
    } else {
        return res.status(403).send({
            message: 'Forbidden'
        });
    }
}

export const userGetPassesApi = async (req: Request, res: Response) => {
    const userId = req.params.userId
    if (req.session.userId === userId) {
        const passes = await prisma.pass.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                dateStart: 'desc'
            }
        })
        return res.json({
            id: userId,
            passes
        })
    } else {
        return res.status(403).send({
            message: 'Forbidden'
        });
    }
}

export const userAddEventAttendance = async (req: Request, res: Response) => {
    const userId = req.params.userId
    const eventId = req.params.eventId
    if (req.session.userId === userId) {
        try {
            const attendance = await prisma.eventAttendance.create({
                data: {
                    completed: false,
                    eventId: eventId,
                    userId: userId,
                }
            })
            return res.json(attendance)
        } catch (e) {
            return res.status(500).send({ message: `Server error ${e}` })
        }
    } else {
        return res.status(403).send({
            message: 'Forbidden'
        });
    }
}

