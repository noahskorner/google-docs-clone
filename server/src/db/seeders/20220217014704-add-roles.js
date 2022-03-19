'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'role',
      [
        {
          id: 1,
          name: 'ADMIN',
        },
        {
          id: 2,
          name: 'SUPERADMIN',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('role', null, {});
  },
};
