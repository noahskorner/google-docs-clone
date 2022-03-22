declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'test' | 'development' | 'production';
      HOST?: string;
      PORT?: string;
      CONNECTION_STRING?: string;
      USER?: string;
      PASSWORD?: string;
      DB_HOST?: string;
      DB_PORT?: string;
      DATABASE?: string;
      SMTP_HOST?: string;
      SMTP_USER?: string;
      SMTP_PASSWORD?: string;
      ACCESS_TOKEN_SECRET?: string;
      ACCESS_TOKEN_EXPIRATION?: string;
      REFRESH_TOKEN_SECRET?: string;
      REFRESH_TOKEN_EXPIRATION?: string;
      VERIFY_EMAIL_SECRET?: string;
      PASSWORD_RESET_SECRET?: string;
      PASSWORD_RESET_EXPIRATION?: string;
    }
  }
}

export {};
