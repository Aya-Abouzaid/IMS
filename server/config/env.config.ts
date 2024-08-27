import dotenv from 'dotenv';

dotenv.config();

const env = {
  // ...process.env,
  API_VERSION: '/api/v1' as string,
  HOST: process.env.HOST || '0.0.0.0',
  NODE_PORT: process.env.NODE_PORT || 5000 as number,

  MONGODB_USER: process.env.MONGODB_USER as string,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD as string,
  MONGODB_DATABASE: process.env.MONGODB_DATABASE as string,
  MONGODB_PORT: process.env.MONGODB_PORT as string,
  MONGODB_HOST: process.env.MONGODB_HOST as string,

  FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL as string,
  EXPIRE: process.env.EXPIRE,
  CORS: process.env.CORS as string,
  SERVER_ENV: process.env.SERVER_ENV as string,
  SECRETE: process.env.CORS as string,

  PEPPER: process.env.PEPPER as string,
  SALT: process.env.SALT,

  SUPER_ADMIN_USERNAME: process.env.SUPER_ADMIN_USERNAME,
  SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
  SUPER_ADMIN_ID: process.env.SUPER_ADMIN_ID,
  SENDER_EMAIL: process.env.SENDER_EMAIL as string,
  SENDER_PASSWORD: process.env.SENDER_PASSWORD as string,
};

export default env;
