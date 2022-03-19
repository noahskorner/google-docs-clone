import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import app from './app';
import env from './config/env.config';

app.listen(env.PORT, () => {
  console.log(`Server listening on port ${env.PORT}...`);
});
