import { prisma } from "@/database/prisma"
import { hashPassword } from "../auth/logic/hash-password"
import { Prisma } from "@prisma/client"
import fs from "fs"
import path from "path"

const barcodeBase64 = Buffer.from(fs.readFileSync(path.resolve("./src/packages/init/images/barcode.png"))).toString('base64')
const greenpeaceGarbageCollectionBase64 = Buffer.from(fs.readFileSync(path.resolve("./src/packages/init/images/greenpeace_garbace_collection.png"))).toString('base64')
const greenPeaceWorkshopBase64 = Buffer.from(fs.readFileSync(path.resolve("./src/packages/init/images/greenpeace_work_shop.png"))).toString('base64')
const molTreePlantingBase64 = Buffer.from(fs.readFileSync(path.resolve("./src/packages/init/images/mol_tree_planting.png"))).toString('base64')
const communityGarbageCollectionBase64 = Buffer.from(fs.readFileSync(path.resolve("./src/packages/init/images/community_garbage_collection.png"))).toString('base64')
const bubiDiscountBase64 = Buffer.from(fs.readFileSync(path.resolve("./src/packages/init/images/bubi_discount.png"))).toString('base64')
const greenpeaceShirtBase64 = Buffer.from(fs.readFileSync(path.resolve("./src/packages/init/images/greenpeace_shirt.png"))).toString('base64')

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
    let bulkUsers = []
    await prisma.user.deleteMany({
        where: {
            firstName: "test"
        }
    })
    for (let i = 0; i < 100; i++) {
        try {
            const bulkUser = await prisma.user.create({
                data: {
                    email: `test${i}@email.com`,
                    firstName: "test",
                    lastName: "test",
                    address: {
                        create: address
                    },
                    credits: 100,
                    password: await hashPassword('admin'),
                }
            })
            bulkUsers.push(bulkUser)
        } catch { }
    }
    if (!createdUser) {
        createdUser = await prisma.user.create({
            data: {
                email: userEmail,
                firstName: "Hacker",
                lastName: "Hector",
                address: {
                    create: address
                },
                credits: 3000,
                password: await hashPassword('admin'),
            }
        })
    }
    let fixUser = await prisma.user.findFirst({
        where: {
            id: "00000000000000000000"
        }
    })
    try {
        if (!fixUser) {
            fixUser = await prisma.user.create({
                data: {
                    id: "00000000000000000000",
                    email: "fix@ookie.com",
                    firstName: "Fix",
                    lastName: "Felix",
                    address: {
                        create: address
                    },
                    credits: 0,
                    password: await hashPassword('admin'),

                }
            })
        }
    } catch { }

    const events: (Prisma.EventCreateInput & {attendingUsers: any[]})[] = [{
        credits: 200,
        date: new Date("2023-11-30T10:00:00Z"),
        description: "Join Greenpeace in our mission to protect our parks and create a cleaner, greener world! We invite you to be a part of our community garbage collection event, where every piece of collected trash brings us one step closer to a healthier planet.",
        image: greenpeaceGarbageCollectionBase64,
        title: "Garbage collection in Kamaraerdő",
        type: "GARBAGE_COLLECTION",
        attendingUsers: bulkUsers.slice(0, 97)
        ,
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
        credits: 200,
        date: new Date("2023-12-12T16:30:00Z"),
        description: "Embark on a journey towards a more sustainable and eco-friendly lifestyle with Greenpeace! Join us for an engaging workshop where we'll explore practical tips, share knowledge, and inspire action for a greener, healthier planet.",
        image: greenPeaceWorkshopBase64,
        title: "Greenpeace sustainability workshop",
        type: "WORKSHOP",
        attendingUsers: bulkUsers.slice(0, 33),
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
        credits: 150,
        date: new Date("2023-12-01T12:00:00Z"),
        image: molTreePlantingBase64,
        title: "Tree planting by MOL Nyrt.",
        description: "Join us for a meaningful and eco-friendly initiative as Mol Nyrt. takes a step towards a greener future! In our ongoing commitment to environmental sustainability, we are excited to invite you to participate in our tree-planting event.",
        type: "TREE_PLANTING",
        attendingUsers: bulkUsers.slice(0, 80),
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
    },
    {
        credits: 50,
        date: new Date("2023-12-01T12:00:00Z"),
        image: communityGarbageCollectionBase64,
        title: "Garbage collection in Zugló",
        description: "Hey! Lately, I've noticed a growing issue that concerns all of us – there's a garbage pile that seems to have been standing in Bobek street for quite some time now. As a community, I believe it's time for us to come together and address this issue head-on. It's disheartening to see our beautiful neighborhood tarnished by this eyesore, not to mention the potential environmental impact it may have. To take matters into our own hands, I'm organizing a community garbage collection event on 2023.12.20., starting at 10:00, right at the problematic site.",
        type: "GARBAGE_COLLECTION",
        attendingUsers: bulkUsers.slice(0, 7),
        organizer: {
            connect: {
                id: user.id
            }
        },
        address: {
            create: {
                city: "Budapest",
                street: "Bobek utca",
                streetNumber: 70,
                zipCode: "1144"
            }
        }
    }]
    await prisma.event.deleteMany()
    for (const event of events.slice(0, -1)) {
        const { attendingUsers, ...eventToCreate} = event
        const createdEvent = await prisma.event.create({
            data: eventToCreate
        })

        await prisma.eventAttendance.createMany({
            data: attendingUsers.map(u => {return {completed: false, eventId: createdEvent.id, userId: u.id}})
        })

    }
    const { attendingUsers, ...eventToCreate} = events[events.length - 1]
    const userEvent = await prisma.event.create({
        data: eventToCreate
    })
    await prisma.eventAttendance.createMany({
        data: attendingUsers.map(u => {return {completed: false, eventId: userEvent.id, userId: u.id}})
    })
    await prisma.eventAttendance.create({
        data: {
            completed: false,
            eventId: userEvent.id,
            userId: fixUser.id
        }
    })


    const consumptions: any[] = [
        {
            amount: 76,
            credits: 300,
            dateStart: new Date("2023-10-01T23:25:57Z"),
            dateEnd: new Date("2023-10-30T23:25:57Z"),
            type: "ELECTRICITY"
        },
        {
            amount: 35,
            credits: 234,
            dateStart: new Date("2023-10-01T23:25:57Z"),
            dateEnd: new Date("2023-10-30T23:25:57Z"),
            type: "GAS"
        },
        {
            amount: 5,
            credits: 245,
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
    await prisma.pass.deleteMany({})
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

    await prisma.storeItem.deleteMany()
    const storeItem1 = await prisma.storeItem.create({
        data:

        {
            credit: 1200,
            title: "Mol Bubi 20% discount",
            description: "We're excited to announce an exclusive partnership between Mol Nyrt. and the , bringing you sustainable savings like never before. As part of our commitment to environmental responsibility, Mol Nyrt. is offering a special 20% discount for Mol Bubi.",
            image: bubiDiscountBase64,
            barcode: barcodeBase64,
            userId: mol.id,
        },
    })

    await prisma.storeItemRedeem.createMany({
        data: bulkUsers.slice(0, 83).map(b => ({ redeemerUserId: b.id, storeItemId: storeItem1.id }))
    })


    const storeItem2 = await prisma.storeItem.create({
        data: {
            credit: 800,
            title: "Greenpeace shirts 30% discount",
            description: "Calling all eco-warriors and sustainability enthusiasts! We're thrilled to reward our engaged users on Sustainify with an exclusive 30% discount on Greenpeace shirts. Now, you can proudly wear your commitment to a greener planet.",
            image: greenpeaceShirtBase64,
            barcode: barcodeBase64,
            userId: greenpeace.id,
        }
    })

    await prisma.storeItemRedeem.createMany({
        data: bulkUsers.slice(0, 44).map(b => ({ redeemerUserId: b.id, storeItemId: storeItem2.id }))
    })

}