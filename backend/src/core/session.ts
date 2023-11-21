declare module 'express-session' {
    interface SessionData {
        userId: string,
        email: string,
        firstName: string,
        lastName: string
    }
}