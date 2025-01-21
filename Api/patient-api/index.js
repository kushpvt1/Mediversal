const express = require('express');
const app = express();
const port = 3000;

// Mock patient data
const patients = [
  { id: 1, name: 'John Doe', age: 30, condition: 'Flu' },
  { id: 2, name: 'Jane Smith', age: 25, condition: 'Cold' },
  { id: 3, name: 'Alice Johnson', age: 40, condition: 'Allergy' },
];

// API endpoint to fetch patients
app.get('/api/patients', (req, res) => {
  res.json(patients);
});

// Start the server
app.listen(port, () => {
    console.log(`Patient API is running at http://localhost:${port}`);

});