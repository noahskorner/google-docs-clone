if (
  process.env.NODE_ENV === undefined ||
  process.env.HOST === undefined ||
  process.env.PORT === undefined ||
  process.env.CONNECTION_STRING === undefined ||
  process.env.USER === undefined ||
  process.env.PASSWORD === undefined ||
  process.env.DB_HOST === undefined ||
  process.env.DB_PORT === undefined ||
  process.env.DATABASE === undefined ||
  process.env.SMTP_HOST === undefined ||
  process.env.SMTP_USER === undefined ||
  process.env.SMTP_PASSWORD === undefined ||
  process.env.ACCESS_TOKEN_SECRET === undefined ||
  process.env.ACCESS_TOKEN_EXPIRATION === undefined ||
  process.env.REFRESH_TOKEN_SECRET === undefined ||
  process.env.REFRESH_TOKEN_EXPIRATION === undefined ||
  process.env.VERIFY_EMAIL_SECRET === undefined ||
  process.env.PASSWORD_RESET_SECRET === undefined ||
  process.env.PASSWORD_RESET_EXPIRATION === undefined
) {
  throw new Error('Environment variables missing.');
}

const env = {
  NODE_ENV: process.env.NODE_ENV,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  CONNECTION_STRING: process.env.CONNECTION_STRING,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DATABASE: process.env.DATABASE,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION,
  VERIFY_EMAIL_SECRET: process.env.VERIFY_EMAIL_SECRET,
  PASSWORD_RESET_SECRET: process.env.PASSWORD_RESET_SECRET,
  PASSWORD_RESET_EXPIRATION: process.env.PASSWORD_RESET_EXPIRATION,
};

export default env;
