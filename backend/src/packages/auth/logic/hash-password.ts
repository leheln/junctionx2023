import bcrypt from 'bcrypt';

export const hashPassword = async (plainPassword: string) => bcrypt.hash(plainPassword, 12);