import { prisma } from "@/database/prisma"
import { hashPassword } from "./hash-password"
import { Prisma } from "@prisma/client"

export const populateDatabase = async () => {
    const address: Prisma.AddressCreateInput = {
        city: "Budapest",
        street: "Váci utca",
        streetNumber: 7,
        zipCode: "1111"
    }

    const passes: Prisma.PassCreateInput[] = [{
        credits: 100,
        dateStart: new Date("2023-11-01T23:25:57Z"),
        dateEnd: new Date("2023-11-30T23:25:57Z"),
        type: "PUBLIC_TRANSPORT"
    },

    {
        credits: 200,
        dateStart: new Date("2023-11-01T23:25:57Z"),
        dateEnd: new Date("2023-11-30T23:25:57Z"),
        type: "BIKE_PASS"
    },

    ]

    const events: Prisma.EventCreateInput[] = [{
        credits: 100,
        date: new Date("2023-11-01T23:25:57Z"),
        description: "A fun event in the past",
        image: "",
        title: "An event",
        type: "GARBAGE_COLLECTION",
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
        address: {
            create: address
        }
    }

    ]
    const userEmail = "user@email.com"
    try {
        await prisma.user.delete({
            where: {
                email: userEmail
            }
        })
    } catch (e) {}
    const createdUser = await prisma.user.create({
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
    await prisma.event.deleteMany()
    const createdEvent1 = await prisma.event.create({
        data: events[0]
    })
    const createdEvent2 = await prisma.event.create({
        data: events[1]
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

}