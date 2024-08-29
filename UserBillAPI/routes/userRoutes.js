const express = require('express');
const { createUser, loginUser, getUsers, vacateUser } = require('../controllers/userController');
const router = express.Router();

router.post('/users', createUser);
router.post('/login', loginUser);
router.get('/users', getUsers);
router.put('/users/:id/vacate', vacateUser);

module.exports = router;
