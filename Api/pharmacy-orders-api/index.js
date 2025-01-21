const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());

// Mock database (in-memory store)
let orders = [];
let orderId = 1;

// Endpoint to add a new order
app.post('/api/orders', (req, res) => {
  const { customerName, medicineName, quantity } = req.body;

  if (!customerName || !medicineName || !quantity) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const newOrder = {
    id: orderId++,
    customerName,
    medicineName,
    quantity,
    status: 'Pending',
  };

  orders.push(newOrder);
  res.status(201).json({ message: 'Order added successfully.', order: newOrder });
});

// Endpoint to view all orders
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Endpoint to delete an order by ID
app.delete('/api/orders/:id', (req, res) => {
  const orderId = parseInt(req.params.id, 10);
  const orderIndex = orders.findIndex(order => order.id === orderId);

  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found.' });
  }

  orders.splice(orderIndex, 1);
  res.json({ message: 'Order deleted successfully.' });
});

// Start the server
app.listen(port, () => {
  console.log(`Pharmacy Orders API is running at http://localhost:${port}`);
});