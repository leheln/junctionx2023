import {prisma} from '@/database/prisma';
import logger from '@/core/logger';
import {validatePassword} from '@/packages/auth/logic/validate-password';

export const validateUser = async (email: string, password: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            return false;
        }

        return validatePassword(password, user.password);

    } catch (error) {
        logger.error('Couldn\'t validate user.', error);
    }
};