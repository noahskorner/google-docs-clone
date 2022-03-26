'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'user',
      [
        {
          email: 'noahskorner@gmail.com',
          password:
            '$2b$10$NAuxXaLjfkhINbeN1KD9EONfRfQZZH60.VqOxHNWyDjkxYd3N6hSO',
          is_verified: true,
          verification_token: '',
          password_reset_token: '',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: 'test@test.com',
          password:
            '$2b$10$NAuxXaLjfkhINbeN1KD9EONfRfQZZH60.VqOxHNWyDjkxYd3N6hSO',
          is_verified: true,
          verification_token: '',
          password_reset_token: '',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: 'test2@test.com',
          password:
            '$2b$10$NAuxXaLjfkhINbeN1KD9EONfRfQZZH60.VqOxHNWyDjkxYd3N6hSO',
          is_verified: true,
          verification_token: '',
          password_reset_token: '',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  },
};
