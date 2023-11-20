"'use strict'";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        employeeId: "2200987",
        name: "Laura S. Thomas",
        designation: "Senior Associate",
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        employeeId: "2200654",
        name: "Robert S. Johnson",
        designation: "Associate",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        employeeId: "2200321",
        name: "Craig D. Corbin",
        designation: "Senior Associate",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        employeeId: "2200311",
        name: "Paul D. Gordon",
        designation: "Associate",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        employeeId: "2200322",
        name: "Michael J. Olsen",
        designation: "Associate",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
