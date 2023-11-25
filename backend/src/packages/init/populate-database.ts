import { prisma } from "@/database/prisma"
import { hashPassword } from "../auth/logic/hash-password"
import { Prisma } from "@prisma/client"
import fs from "fs"
import path from "path"

const barcodeBase64 = Buffer.from(fs.readFileSync(path.resolve("./src/packages/init/images/barcode.png"))).toString('base64')
const greenpeaceGarbageCollectionBase64 = Buffer.from(fs.readFileSync(path.resolve("./src/packages/init/images/greenpeace_garbace_collection.png"))).toString('base64')
const greenPeaceWorkshopBase64 = Buffer.from(fs.readFileSync(path.resolve("./src/packages/init/images/greenpeace_work_shop.png"))).toString('base64')
const molTreePlantingBase64 = Buffer.from(fs.readFileSync(path.resolve("./src/packages/init/images/mol_tree_planting.png"))).toString('base64')

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
        await prisma.user.delete({ where: { email: "green@green.com" } })
    } catch { }
    try {
        await prisma.user.delete({ where: { email: "mol@mol.com" } })
    } catch { }

    const greenpeace = await prisma.user.create({
        data: {
            email: "green@green.com",
            address: {
                create: address
            },
            firstName: "",
            lastName: "Greenpeace",
            password: "",

        }
    })

    const mol = await prisma.user.create({
        data: {
            email: "mol@mol.com",
            address: {
                create: address
            },
            firstName: "",
            lastName: "Mol Nyrt.",
            password: "",

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

    greenPeaceWorkshopBase64
    const events: Prisma.EventCreateInput[] = [{
        credits: 100,
        date: new Date("2023-11-30T23:25:57Z"),
        description: "Join Greenpeace in our mission to protect our parks and create a cleaner, greener world! We invite you to be a part of our community garbage collection event, where every piece of collected trash brings us one step closer to a healthier planet.",
        image: greenpeaceGarbageCollectionBase64,
        title: "Garbage collection in Kamaraerdő",
        type: "GARBAGE_COLLECTION",
        organizer: {
            connect: {
                id: greenpeace.id
            }
        },
        address: {
            create: {
                city: "Budapest",
                zipCode: "1112",
                streetNumber: 9,
                street: "Kamara erdei út"
            }
        }
    },
    {
        credits: 100,
        date: new Date("2023-12-12T23:25:57Z"),
        description: "Embark on a journey towards a more sustainable and eco-friendly lifestyle with Greenpeace! Join us for an engaging workshop where we'll explore practical tips, share knowledge, and inspire action for a greener, healthier planet.",
        image: greenpeaceGarbageCollectionBase64,
        title: "Greenpeace sustainability workshop",
        type: "WORKSHOP",
        organizer: {
            connect: {
                id: greenpeace.id
            }
        },
        address: {
            create: {
                city: "Budapest",
                zipCode: "1015",
                streetNumber: 104,
                street: "János utca"
            }
        }
    },
    {
        credits: 100,
        date: new Date("2023-12-01T23:25:57Z"),
        image: molTreePlantingBase64,
        title: "Tree planting by MOL Nyrt.",
        description: "Join us for a meaningful and eco-friendly initiative as Mol Nyrt. takes a step towards a greener future! In our ongoing commitment to environmental sustainability, we are excited to invite you to participate in our tree-planting event.",
        type: "TREE_PLANTING",
        organizer: {
            connect: {
                id: mol.id
            }
        },
        address: {
            create: {
                city: "Budapest",
                street: "Eötvös út",
                streetNumber: 7,
                zipCode: "1121"
            }
        }
    }]
    await prisma.event.deleteMany()
    await prisma.event.createMany({
        data: events
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


    await prisma.storeItem.createMany({
        data: [
            {
                credit: 100,
                title: "StoreItem 1",
                description: "Store item desc",
                image: "",
                barcode: barcodeBase64,
                userId: createdUser.id
            },
            {
                credit: 100,
                title: "StoreItem 2",
                description: "Longer store item desc",
                image: "",
                barcode: barcodeBase64,
                userId: createdUser.id
            }
        ]
    })

}