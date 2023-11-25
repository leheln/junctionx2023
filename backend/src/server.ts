import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import * as http from 'http';
import {Server as SocketIoServer} from 'socket.io';
import session from 'express-session';
import RedisStore from 'connect-redis';
import {redis} from '@/database/redis';
import {apiRegistry, socketRegistry} from '@/registry';
import logger from '@/core/logger';
import {createFirstUser} from '@/packages/auth';
import { populateDatabase } from './packages/auth/logic/populate-database';


const server = async () => {
    if (process.env.NODE_ENV !== 'production') {
        dotenv.config();
    }

    // Redis initialization
    await redis.connect();

    // Basic server and SocketIO Setup
    const app = express();
    app.use(cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    }));
    const socketIoServer = http.createServer(app);
    const io = new SocketIoServer(socketIoServer);
    io.on('connection', async (socket) => await socketRegistry(socket));

    // Parse incoming request bodies (allows req.body)
    app.use(express.json());

    // Setting up session for both express and socket.io
    // This way session will be available for sockets too
    const redisStore = new RedisStore({
        client: redis,
        prefix: 'session:',
    });
    const sessionOptions = {
        store: redisStore,
        secret: process.env.SESSION_SECRET,
        resave: true,
        rolling: true,
        saveUninitialized: true,
        cookie: {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(process.env.SESSION_MAX_AGE) * 60 * 1000 || 24 * 60 * 60 * 1000
        },
        secure: true
    };
    if (process.env.NODE_ENV === 'development') {
        sessionOptions.cookie.secure = false;
    }
    const sessionMiddleware: any = session(sessionOptions);
    app.use(sessionMiddleware);

    // Connecting Sockets
    io.use((socket: any, next: any) => sessionMiddleware(socket.request, {}, next));

    // Connecting API Endpoints
    apiRegistry(app);

    // If this is a new instance of our application, the first user (an admin) is created here
    await createFirstUser();

    await populateDatabase();

    // Opening port
    const PORT = Number(process.env.PORT ?? 8000);
    app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
    });
}

server().catch(console.error);