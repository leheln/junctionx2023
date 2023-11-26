import { prisma } from '@/database/prisma';
import { ConsumptionType } from '@prisma/client';
import { Request, Response } from 'express';

export const userGetApi = async (req: Request, res: Response) => {
    const userId = req.params.userId
    if (req.session.userId === userId) {
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            },
            include: {
                storeItems: true,
                address: true
            }
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
    const consumptions = await prisma.consumption.findMany({
        where: {
            userId: req.params.userId,
        },
        orderBy: {
            dateStart: 'desc'
        }
    })
    return res.json(consumptions)
}

export const userGetPassesApi = async (req: Request, res: Response) => {
    const passes = await prisma.pass.findMany({
        where: {
            userId: req.params.userId,
        },
        orderBy: {
            dateStart: 'desc'
        }
    })
    return res.json(passes)
}

export const userAddEventAttendance = async (req: Request, res: Response) => {
    const userId = req.session.userId
    const eventId = req.params.eventId
    try {
        const attendance = await prisma.eventAttendance.create({
            data: {
                completed: false,
                event: {
                    connect: {
                        id: eventId
                    }
                },
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
        return res.json(attendance)
    } catch (e) {
        return res.status(500).send({ message: `Server error ${e}` })
    }
}

export const userRemoveEventAttendance = async (req: Request, res: Response) => {
    const userId = req.session.userId
    const eventId = req.params.eventId
    try {
        const attendanceToDelete = await prisma.eventAttendance.findFirstOrThrow({
            where: {
                event: {
                    id: eventId
                },
                user: {
                    id: userId
                }
            }
        })

        const attendanceDeleted = await prisma.eventAttendance.delete({
            where: {
                id: attendanceToDelete.id
            }
        })
        return res.json(attendanceDeleted)
    } catch (e) {
        return res.status(500).send({ message: `Server error ${e}` })
    }
}


export const userDeleteEventAttendance = async (req: Request, res: Response) => {
    const userId = req.params.userId
    const eventId = req.params.eventId
    if (req.session.userId === userId) {
        try {
            const attendance = await prisma.eventAttendance.findFirst({
                where: {
                    eventId: eventId,
                    userId: userId
                }
            })
            if (!attendance) {
                return res.status(404).send({ message: `Attendance not found` })
            } else {
                const deletedAttendance = await prisma.eventAttendance.delete({
                    where: { id: attendance.id }
                })
                return res.json(deletedAttendance)

            }
        } catch (e) {
            return res.status(500).send({ message: `Server error ${e}` })
        }
    } else {
        return res.status(403).send({
            message: 'Forbidden'
        });
    }
}

export const userAddPass = async (req: Request, res: Response) => {
    const userId = req.params.userId
    const passBody = req.body
    if (req.session.userId === userId) {
        try {
            const pass = await prisma.pass.create({
                data: {
                    ...passBody,
                    userId,
                }
            })
            return res.json(pass)
        } catch (e) {
            return res.status(500).send({ message: `Server error ${e}` })
        }
    } else {
        return res.status(403).send({
            message: 'Forbidden'
        });
    }
}

export const userDeletePass = async (req: Request, res: Response) => {
    const userId = req.params.userId
    const passId = req.params.passId
    if (req.session.userId === userId && passId) {
        try {
            const pass = await prisma.pass.delete({
                where: {
                    id: passId,
                    userId: userId
                }
            })

            return res.status(200).send(pass)
        } catch (e) {
            return res.status(500).send({ message: `Server error ${e}` })
        }
    } else {
        return res.status(403).send({
            message: 'Forbidden'
        });
    }
}


export const userAddConsumption = async (req: Request, res: Response) => {
    const consumptionBody = req.body
    try {
        const user = await prisma.user.findFirstOrThrow({
            where: {
                id: req.session.userId
            }
        })
        const credits = calculateCredit(consumptionBody.type, consumptionBody.amount)
        const consumption = await prisma.consumption.create({
            data: {
                ...consumptionBody,
                user: { connect: { id: req.session.userId } },
                credits: credits
            }
        })

        await prisma.user.update({
            where: {
                id: req.session.userId
            },
            data: {
                credits: user.credits + credits
            }
        })
        return res.json(consumption)
    } catch (e) {
        return res.status(500).send({ message: `Server error ${e}` })
    }
}

const calculateCredit = (consumptionType: ConsumptionType, consumption: number) => {
    if (consumption < 0) {
        return 0
    }
    switch(consumptionType) {
        case "ELECTRICITY": 
            return Math.max(100 - consumption, 0)
        case 'GAS': 
            return Math.max(100 - consumption, 0)
        case "WATER":
            return Math.max(7 - consumption, 0) 
        default: 
            return 0
    }
}

export const userDeleteConsumption = async (req: Request, res: Response) => {
    const consumptionId = req.params.consumptionId
    const consumption = await prisma.consumption.delete({
        where: {
            id: consumptionId,
            userId: req.params.userId
        }
    })
    return res.status(200).send(consumption)
}

export const userGetStoreItemsApi = async (req: Request, res: Response) => {
    const userId = req.session.userId

    const storeItems = await prisma.storeItem.findMany({
        where: {
            userId
        }
    })
    return res.status(200).send({ items: storeItems })
}

