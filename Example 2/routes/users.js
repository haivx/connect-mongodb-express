const express = require('express');
const router = express.Router();
const UsersControllers = require('../controllers/users.controller')
/* GET users listing. */
router.route('/')
.get( UsersControllers.index)
.post(UsersControllers.newUser)

/* GET /:id */
router.route('/:userId')
  .get(UsersControllers.getUser)
  .put(UsersControllers.replaceUser)
  .patch(UsersControllers.modifyUser)

router.route('/:userId/cars')
  .get(UsersControllers.getUserCars)
  .post(UsersControllers.newUserCar)
module.exports = router;
