const User = require('../models/User');
const Bill = require('../models/Bill');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  const { name, role, password } = req.body;
  try {
    const newUser = new User({ name, role, password });
    await newUser.save();

    const securityBill = new Bill({
      amount: 100,
      dueDate: new Date(),
      status: 'pending',
      userId: newUser._id,
      billType: 'security',
    });
    await securityBill.save();

    res.json({ user: newUser, message: 'User created successfully' });
  } catch (err) {
    console.log("err",err);
    
    res.status(500).json({ error: 'Server error' });
  }
};

exports.loginUser = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token, message: 'Logged in successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.vacateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const bills = await Bill.find({ userId: id });

    const paidBills = bills.filter(bill => bill.status === 'paid');
    const unpaidBills = bills.filter(bill => bill.status === 'pending');
    const securityRefund = paidBills
      .filter(bill => bill.billType === 'security')
      .reduce((acc, bill) => acc + bill.amount, 0);

    user.status = 'vacated';
    await user.save();

    res.json({
      totalPaid: paidBills.length,
      totalUnpaid: unpaidBills.length,
      refundAmount: securityRefund,
      message: 'User vacated successfully',
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
