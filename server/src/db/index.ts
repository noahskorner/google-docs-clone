/* eslint-disable no-undef */
import { exec } from 'child_process';

const seedDatabase = async () => {
  await new Promise((resolve, reject) => {
    exec(
      'npx sequelize-cli db:seed:all --config src/db/config.json --seeders-path src/db/seeders',
      { env: process.env },
      (err) =>
        err
          ? reject(err)
          : resolve(() => {
              console.log('Database successfully seeded.');
            })
    );
  });
};

export default seedDatabase;
