const express = require('express');
const { getBills, createBill, payBill } = require('../controllers/billController');
const router = express.Router();

router.get('/users/:userId/bills', getBills);
router.post('/bills', createBill);
router.put('/bills/:id/pay', payBill);

module.exports = router;
