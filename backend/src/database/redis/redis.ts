import { createClient } from 'redis';
import logger from '@/core/logger';

const redisUrl = process.env.REDIS_URL;

export const redisClient = createClient({
    url: redisUrl
});

redisClient.on('error', err => logger.error('Redis Client Error', err));