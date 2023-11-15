const express = require('express');
const { body, param } = require("express-validator");
const validate = require("../middlewares/validateMiddleware");
const { createTask, fetchTasks, updateTask, deleteTask, checkMaintenanceStatus } = require('../controllers/taskController');

const router = express.Router();

router.route('/checkMaintenanceStatus')
.get([
  body("startDate").notEmpty().isString(),
  body("endDate").notEmpty().isString(),
  body("startTime").notEmpty().isString(),
],
validate,
checkMaintenanceStatus
);

router.route('/')
.get(fetchTasks)
.post([
  body("title").notEmpty().isString(),
  body("reason").notEmpty().isString(),
  body("chgNumber").notEmpty().isString(),
  body("startDate").notEmpty().isString(),
  body("endDate").notEmpty().isString(),
  body("startTime").notEmpty().isString(),
  body("endTime").notEmpty().isString(),
],
validate,
createTask
);

router.route('/:id')
.put([
  param("id").isInt(),
  body("title").notEmpty().isString(),
  body("reason").notEmpty().isString(),
  body("chgNumber").notEmpty().isString(),
  body("startDate").notEmpty().isString(),
  body("endDate").notEmpty().isString(),
  body("startTime").notEmpty().isString(),
  body("endTime").notEmpty().isString(),
],
validate,
updateTask)
.delete([param("id").isInt()],validate, deleteTask);

module.exports = router;
