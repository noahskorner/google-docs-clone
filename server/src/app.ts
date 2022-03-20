import express from 'express';
import cors from 'cors';
import db from './db/models';
import router from './routes';
import errorHandler from './middleware/error-handler';

// MIDDLEWARE
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);
app.use(router);
app.use(errorHandler);

// DATABASE
db.sequelize.sync();
// import env from './config/env.config';
// import seedDatabase from './db';
// if (env.NODE_ENV === 'development' || env.NODE_ENV === 'test') {
//   db.sequelize
//     .sync({ force: true })
//     .then(async () => {
//       console.log('Drop and re-sync db...');
//     })
//     .then(() => {
//       seedDatabase().then(() => {
//         console.log('Seeding database...');
//       });
//     });
// }

export default app;
