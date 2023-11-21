import bcrypt from 'bcrypt';

export const validatePassword = async (plainPassword: string, hashPassword: string) => bcrypt.compare(plainPassword, hashPassword);