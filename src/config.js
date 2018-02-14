import dotenv from 'dotenv';
import path from 'path';

const root = path.join.bind(this, __dirname, '../');
dotenv.config({ path: root('.env') });

export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction =
  process.env.NODE_ENV === 'production' || !isDevelopment;

export const databaseConfig = process.env.MONGO_URL;

export const port = process.env.PORT;
export const endpointURL = process.env.ENDPOINT_URL;

export const botToken = process.env.BOT_TOKEN;

export const secretOne = process.env.JWT_KEY_ONE;
export const secretTwo = process.env.JWT_KEY_TWO;
export const authTime = 60;

export const languages = ['en', 'ru', 'fr', 'es', 'de', 'ar', 'ko'];
export const types = ['bot', 'channel', 'group', 'sticker'];

export const uploadDir = path.join(__dirname, '..', 'uploads');
