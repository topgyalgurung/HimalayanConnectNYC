import { z } from "zod";

const envSchema = z.object({
  DATABASE_DATABASE_URL: z.string().url(),
  CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  JWT_SECRET: z.string().min(32),
  DOMAIN: z.string().url(),
  NODEMAILER_USER: z.string().email(),
  NODEMAILER_PASSWORD: z.string(),
  NODE_ENV: z.enum(["development", "production", "test"]),
});

export const env = envSchema.parse(process.env);

export const config = {
  database: {
    url: process.env.DATABASE_DATABASE_URL,
  },
  cloudinary: {
    cloudName: process.env.CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    domain: process.env.DOMAIN,
  },
  email: {
    user: process.env.NODEMAILER_USER,
    password: process.env.NODEMAILER_PASSWORD,
  },
};
