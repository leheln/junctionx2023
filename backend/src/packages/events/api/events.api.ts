import {Request, Response} from 'express';
import {prisma} from '@/database/prisma';

export const eventGetListApi = async (req: Request, res: Response) => {

    const events = await prisma.event.findMany({
        include: {
            attendance: true
        }
    })
    return res.json({ items: events })
}


export const eventGetApi = async (req: Request, res: Response) => {
    const eventId = req.params.eventId
    if (eventId) {
        const event = await prisma.event.findFirst({
            where: {
                id: eventId,
            },
            include: {
                address: true,
                attendance: true,
                organizer: true
            }
        })
        if (event) {
            return res.json(event)
        } else {
            return res.status(404).send({
                message: 'Event not found'
            });
        }
    } else {
        return res.status(400).send({
            message: 'Bad request'
        });
    }
}

export const eventCreateApi = async (req: Request, res: Response,) => {

    const eventBody = req.body

    if (eventBody) {
        const { address, ...event } = eventBody
        try {
            const createdEvent = await prisma.event.create({
                data: {
                    ...event,
                    address: {
                        create: address
                    }

                }
            })
            return res.status(201).send(createdEvent)
        } catch (e) {
            return res.status(500).send({ message: `Server error ${e}` })
        }


    } else {
        return res.status(400).send({
            message: 'Bad request'
        });
    }
}

export const eventUpdateApi = async (req: Request, res: Response) => {
    const eventId = req.params.eventId
    const eventBody = req.body
    if (eventBody && eventId) {
        try {

            const event = await prisma.event.update({
                data: eventBody,
                where: {
                    id: eventId
                }
            })
            return res.status(204).send(event)
        }

        catch (e) {
            return res.status(500).send({ message: `Server error ${e}` })
        }
    } else {
        return res.status(400).send({
            message: 'Bad request'
        });
    }
}

export const eventDeleteApi = async (req: Request, res: Response) => {
    const eventId = req.params.eventId
    if (eventId) {
        try {
            await prisma.eventAttendance.deleteMany({
                where: {
                    eventId: eventId
                }
            })
            const event = await prisma.event.delete({
                where: {
                    id: eventId
                }
            })
            return res.status(200).send(event)
        } catch (e) {
            return res.status(500).send({ message: `Server error ${e}` })
        }
       
    } else {
        return res.status(400).send({
            message: 'Bad request'
        });
    }
}

export const eventGetAttendanceApi = async (req: Request, res: Response) => {
    const eventId = req.params.eventId
    if (eventId) {
        const eventAttendances = await prisma.eventAttendance.findMany({
            where: {
                eventId
            }
        })
        return res.status(200).send(eventAttendances)
    } else {
        return res.status(400).send({
            message: 'Bad request'
        });
    }
}


export const eventValidateParticipationApi = async (req: Request, res: Response) => {
    const eventId = req.params.eventId
    const userToValidateParticipationForId = req.params.userId
    const validatingUserId = req.session.userId

    if (eventId && userToValidateParticipationForId) {
        const userToValidate = await prisma.user.findFirstOrThrow({
            where: {
                id: userToValidateParticipationForId
            }
        })
        const event = await prisma.event.findFirstOrThrow({
            where: {
                id: eventId,
                organizerId: validatingUserId,
            }
        })

        const attendance = await prisma.eventAttendance.findFirstOrThrow({
            where: {
                eventId: eventId,
                userId: userToValidateParticipationForId,
            }
        })
        if (attendance.completed) {
            return res.status(200).send(attendance)
        }
        try {

            await prisma.eventAttendance.update({
                where: {
                    id: attendance.id,
                    eventId: eventId,
                    userId: userToValidateParticipationForId,
                    completed: false
                },
                data: {
                    completed: true
                }
            })
            await prisma.user.update({
                where: {
                    id: userToValidateParticipationForId
                },
                data: {
                    credits: userToValidate.credits + event.credits
                }
            })
        } catch {}
            
        
        return res.status(200).send(attendance)
    } else {
        return res.status(400).send({
            message: 'Bad request'
        });
    }
}