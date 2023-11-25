import {Request, Response} from 'express';
import {prisma} from '@/database/prisma';

export const storeItemListApi = async (req: Request, res: Response) => {

    const storeItems = await prisma.storeItem.findMany({})
    return res.json({ items: storeItems })
}


export const storeItemGetApi = async (req: Request, res: Response) => {
    const storeItemId = req.params.storeItemId
    if (storeItemId) {
        const storeItem = await prisma.storeItem.findFirst({
            where: {
                id: storeItemId,
            },
        })
        if (storeItem) {
            return res.json(storeItem)
        } else {
            return res.status(404).send({
                message: 'StoreItem not found'
            });
        }
    } else {
        return res.status(400).send({
            message: 'Bad request'
        });
    }
}

export const storeItemCreateApi = async (req: Request, res: Response,) => {

    const storeItemBody = req.body

    if (storeItemBody) {
        try {
            const createdStoreItem = await prisma.storeItem.create({
                data: storeItemBody
            })
            return res.status(201).send(createdStoreItem)
        } catch (e) {
            return res.status(500).send({ message: `Server error ${e}` })
        }


    } else {
        return res.status(400).send({
            message: 'Bad request'
        });
    }
}

export const storeItemUpdateApi = async (req: Request, res: Response) => {
    const storeItemId = req.params.storeItemId
    const storeItemBody = req.body
    if (storeItemBody && storeItemId) {
        try {

            const storeItem = await prisma.storeItem.update({
                data: storeItemBody,
                where: {
                    id: storeItemId
                }
            })
            return res.status(204).send(storeItem)
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

export const storeItemDeleteApi = async (req: Request, res: Response) => {
    const storeItemId = req.params.storeItemId
    if (storeItemId) {
        const storeItem = await prisma.storeItem.delete({
            where: {
                id: storeItemId
            }
        })
        return res.status(200).send(storeItem)
    } else {
        return res.status(400).send({
            message: 'Bad request'
        });
    }
}


