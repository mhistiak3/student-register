import dotenv from 'dotenv';
dotenv.config();
export const { APP_PORT, DATABASE_URL, JWT_SECRET } = process.env;
