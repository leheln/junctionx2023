import {prisma} from '@/database/prisma';
import {hashPassword} from '@/packages/auth/logic/hash-password';

export const createFirstUser = async () => {
    const userCount = await prisma.user.count();
    if (userCount === 0) {
        await prisma.user.create({
            data: {
                email: 'john.smith@hackermen.com',
                password: await hashPassword('admin'),
                firstName: 'John',
                lastName: 'Smith'
            }
        });
    }
};