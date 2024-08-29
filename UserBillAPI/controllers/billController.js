const Bill = require('../models/Bill');

exports.getBills = async (req, res) => {
  const { userId } = req.params;
  try {
    const bills = await Bill.find({ userId });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createBill = async (req, res) => {
  const { amount, dueDate, userId, billType } = req.body;
  try {
    const newBill = new Bill({ amount, dueDate, userId, billType });
    await newBill.save();
    res.json({ bill: newBill, message: 'Bill created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.payBill = async (req, res) => {
  const { id } = req.params;
  try {
    const bill = await Bill.findById(id);
    if (!bill) return res.status(404).json({ error: 'Bill not found' });

    bill.status = 'paid';
    await bill.save();

    res.json({ bill, message: 'Bill marked as paid' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
