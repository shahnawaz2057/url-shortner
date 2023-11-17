const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");

const { UsersModel, UrlsModel, AuditsModel, sequelize } = require("../models");
const BadRequest = require("../errors/badRequestError");
const NotFoundError = require("../errors/notFoundError");

const createUser = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { employeeId, name, designation } = req.body;

    let userExist = await UsersModel.findOne({
      where: { employeeId },
      transaction: t,
    });
    if (userExist) {
      throw new BadRequest("user with the same employeeId already exist!");
    }

    const user = await UsersModel.create(
      { employeeId, name, designation },
      { transaction: t }
    );

    await AuditsModel.create(
      {
        action: "CREATE",
        tableName: "users",
        recordId: user.id,
        userId: 1, // Who can create? Super admin? hard code for now.
        timestamp: new Date(),
      },
      { transaction: t }
    );
    t.commit();
    res.status(StatusCodes.CREATED).json({
      message: "user created successfully!",
      data: user,
    });
  } catch (error) {
    t.rollback();
    next(error);
  }
};

const fetchUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UsersModel.findOne({ where: { id: parseInt(id) } });
    if (!user) {
      throw new NotFoundError("user not found!");
    }

    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    next(error);
  }
};

const fetchUsers = async (req, res, next) => {
  try {
    const { page, perPage, search = "" } = req.query;
    const currentPage = page ? parseInt(page) : 1;
    const currentLimit = perPage ? parseInt(perPage) : 10;
    const offset = (currentPage - 1) * currentLimit;

    const where = {
      [Op.or]: [
        {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        },
        {
          employeeId: {
            [Op.iLike]: `%${search}%`,
          },
        },
      ],
    };

    const { count, rows } = await UsersModel.findAndCountAll({
      where,
      include: ["urls"],
      limit: currentLimit,
      offset: offset,
    });

    res.status(StatusCodes.OK).json({
      data: rows,
      totalCount: count,
      totalPages: Math.ceil(count / currentLimit),
      currentPage: currentPage,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { isAdmin, isActive } = req.body;
    const user = await UsersModel.findOne({
      where: { id: parseInt(id) },
      transaction: t,
    });

    if (!user) {
      throw new NotFoundError("user not found!");
    }

    if (typeof isAdmin !== undefined) {
      user.isAdmin = isAdmin;
    }
    if (typeof isActive !== undefined) {
      user.isActive = isActive;
    }

    await user.save({ transaction: t });

    await AuditsModel.create(
      {
        action: "UPDATE",
        tableName: "users",
        recordId: user.id,
        userId: 1, // Who can create? Super admin? hard code for now.
        timestamp: new Date(),
      },
      { transaction: t }
    );
    t.commit();

    res.status(StatusCodes.OK).json({
      message: "user updated successfully!",
      data: user,
    });
  } catch (error) {
    t.rollback();
    next(error);
  }
};

module.exports = { createUser, fetchUsers, fetchUser, updateUser };
