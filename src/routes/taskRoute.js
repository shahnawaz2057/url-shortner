const express = require('express');
const { body, param } = require("express-validator");
const validate = require("../middlewares/validateMiddleware");
const { 
  createTask, 
  fetchTasks, 
  updateTask, 
  deleteTask, 
  checkMaintenanceStatus 
} = require('../controllers/taskController');

const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();
router.use(authenticateUser);

// router.route('/checkMaintenanceStatus')
// .get([
//   body("startDate").notEmpty().isString(),
//   body("endDate").notEmpty().isString(),
// ],
// validate,
// checkMaintenanceStatus
// );

router.route('/checkMaintenanceStatus')
.get(checkMaintenanceStatus)

router.route('/')
.get(fetchTasks)
.post([
  body("title").notEmpty().isString(),
  body("reason").notEmpty().isString(),
  body("chgNumber").notEmpty().isString(),
  body("startDate").notEmpty().isString(),
  body("endDate").notEmpty().isString()
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
  body("startDate").notEmpty().isString().toDate(),
  body("endDate").notEmpty().isString().toDate(),
],
validate,
updateTask)
.delete([param("id").isInt()],validate, deleteTask);

module.exports = router;
