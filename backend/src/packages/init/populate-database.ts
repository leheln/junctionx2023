import { prisma } from "@/database/prisma"
import { hashPassword } from "../auth/logic/hash-password"
import { Prisma } from "@prisma/client"

export const populateDatabase = async () => {
    const address: Prisma.AddressCreateInput = {
        city: "Budapest",
        street: "Váci utca",
        streetNumber: 7,
        zipCode: "1111"
    }


    const userEmail = "user@email.com"
    const user = await prisma.user.findFirst({
        where: {
            email: userEmail
        }
    })
    try {

        if (!user) {

            await prisma.user.delete({
                where: {
                    email: userEmail
                }
            })
        }
    } catch (e) { }
    let createdUser = user
    if (!createdUser) {
        createdUser = await prisma.user.create({
            data: {
                email: userEmail,
                firstName: "Hacker",
                lastName: "Hector",
                address: {
                    create: address
                },
                credits: 0,
                password: await hashPassword('admin'),

            }
        })
    }


    const events: Prisma.EventCreateInput[] = [{
        credits: 100,
        date: new Date("2023-11-01T23:25:57Z"),
        description: "A fun event in the past",
        image: "",
        title: "An event",
        type: "GARBAGE_COLLECTION",
        organizer: {
            connect: {
                id: createdUser.id
            }
        },
        address: {
            create: address
        }
    },
    {
        credits: 100,
        date: new Date("2023-11-30T23:25:57Z"),
        description: "A fun event",
        image: "",
        title: "An event",
        type: "GARBAGE_COLLECTION",
        organizer: {
            connect: {
                id: createdUser.id
            }
        },
        address: {
            create: address
        }
    }]
    await prisma.event.deleteMany()
    const createdEvent1 = await prisma.event.create({
        data: events[0]
    })
    const createdEvent2 = await prisma.event.create({
        data: events[1]
    })
    const consumptions: any[] = [
        {
            amount: 100,
            credits: 800,
            dateStart: new Date("2023-10-01T23:25:57Z"),
            dateEnd: new Date("2023-10-30T23:25:57Z"),
            type: "ELECTRICITY"
        },
        {
            amount: 35,
            credits: 1170,
            dateStart: new Date("2023-10-01T23:25:57Z"),
            dateEnd: new Date("2023-10-30T23:25:57Z"),
            type: "GAS"
        },
        {
            amount: 5,
            credits: 500,
            dateStart: new Date("2023-10-01T23:25:57Z"),
            dateEnd: new Date("2023-10-30T23:25:57Z"),
            type: "WATER"
        },
    ]
    await prisma.consumption.deleteMany({})
    await prisma.consumption.createMany({
        data: consumptions.map(c => {
            c.userId = createdUser.id
            return c
        })
    })

    const passes: any[] = [{
        credits: 100,
        dateStart: new Date("2023-11-01T23:25:57Z"),
        dateEnd: new Date("2023-11-30T23:25:57Z"),
        type: "PUBLIC_TRANSPORT",
    },

    {
        credits: 200,
        dateStart: new Date("2023-11-01T23:25:57Z"),
        dateEnd: new Date("2023-11-30T23:25:57Z"),
        type: "BIKE_PASS"
    },

    ]
    prisma.pass.deleteMany({})
    await prisma.pass.create({
        data: {
            userId: createdUser.id,
            ...passes[0]
        }
    })
    await prisma.pass.create({
        data: {
            userId: createdUser.id,
            ...passes[1]
        }
    })

    await prisma.eventAttendance.deleteMany()
    await prisma.eventAttendance.createMany({
        data: [
            {
                completed: true,
                eventId: createdEvent1.id,
                userId: createdUser.id
            },
            {
                completed: false,
                eventId: createdEvent2.id,
                userId: createdUser.id
            }
        ]
    })

    await prisma.storeItem.createMany({
        data: [
            {
                credit: 100,
                title: "StoreItem 1",
                description: "Store item desc",
                image: "",
                userId: createdUser.id
            },
            {
                credit: 100,
                title: "StoreItem 2",
                description: "Longer store item desc",
                image: "",
                userId: createdUser.id
            }
        ]
    })

}