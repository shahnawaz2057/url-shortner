"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { User } = require("../../models");

    const [user] = await User.findOrCreate({
      where: {
        employeeId: "2200987",
      },
      defaults: {
        employeeId: "2200987",
        name: "Laura S. Thomas",
        designation: "Senior Associate",
        isAdmin: true,
        isActive: true,
      },
    });

    return queryInterface.bulkInsert("urls", [
      {
        originalUrl:
          "https://sequelize.org/docs/v6/core-concepts/model-querying-basics/",
        shortUrl: "basics",
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        originalUrl:
          "https://sequelize.org/docs/v6/core-concepts/model-querying-finders/",
        shortUrl: "finders",
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        originalUrl:
          "https://sequelize.org/docs/v6/core-concepts/getters-setters-virtuals/",
        shortUrl: "setter",
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        originalUrl:
          "https://sequelize.org/docs/v6/other-topics/other-data-types/",
        shortUrl: "types",
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        originalUrl: "https://sequelize.org/docs/v6/other-topics/migrations/",
        shortUrl: "migrations",
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        originalUrl:
          "https://sequelize.org/docs/v6/other-topics/query-interface/",
        shortUrl: "query",
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        originalUrl: "https://sequelize.org/docs/v6/other-topics/transactions/",
        shortUrl: "trans",
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        originalUrl: "https://sequelize.org/docs/v6/other-topics/typescript/",
        shortUrl: "typescripts",
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        originalUrl: "https://sequelize.org/docs/v6/core-concepts/assocs/",
        shortUrl: "assocs",
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        originalUrl:
          "https://sequelize.org/docs/v6/advanced-association-concepts/polymorphic-associations/",
        shortUrl: "poly",
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("urls", null, {});
  },
};
