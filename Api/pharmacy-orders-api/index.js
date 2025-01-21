const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
//Replace the Password and Username of your MongoDB
const mongoURI = 'mongodb+srv://Username:<Password>@pharmacy.xmafd.mongodb.net/?retryWrites=true&w=majority&appName=Pharmacy';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Order Schema and Model
const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  medicineName: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

// API Endpoints

// Create a new order
app.post('/api/orders', async (req, res) => {
  const { customerName, medicineName, quantity } = req.body;

  if (!customerName || !medicineName || !quantity) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const newOrder = new Order({ customerName, medicineName, quantity });
    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Order added successfully.', order: savedOrder });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order.' });
  }
});

// Retrieve all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve orders.' });
  }
});

// Delete an order by ID
app.delete('/api/orders/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found.' });
    }
    res.json({ message: 'Order deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete order.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Pharmacy Orders API is running at http://localhost:${port}`);
});