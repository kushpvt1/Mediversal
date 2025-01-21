const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());

// Mock database (in-memory store)
let appointments = [];

// Utility function to check for overlapping appointments
const isOverlapping = (newAppointment) => {
  return appointments.some((appointment) => {
    return (
      appointment.date === newAppointment.date &&
      (
        (newAppointment.startTime >= appointment.startTime && newAppointment.startTime < appointment.endTime) ||
        (newAppointment.endTime > appointment.startTime && newAppointment.endTime <= appointment.endTime) ||
        (newAppointment.startTime <= appointment.startTime && newAppointment.endTime >= appointment.endTime)
      )
    );
  });
};

// Endpoint to create a new appointment
app.post('/api/appointments', (req, res) => {
  const { patientName, date, startTime, endTime } = req.body;

  // Validate input
  if (!patientName || !date || !startTime || !endTime) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (new Date(startTime) >= new Date(endTime)) {
    return res.status(400).json({ error: 'Start time must be before end time.' });
  }

  // Check for overlapping appointments
  const newAppointment = { id: appointments.length + 1, patientName, date, startTime, endTime };
  if (isOverlapping(newAppointment)) {
    return res.status(409).json({ error: 'Appointment time overlaps with an existing appointment.' });
  }

  // Add the new appointment
  appointments.push(newAppointment);
  res.status(201).json({ message: 'Appointment created successfully.', appointment: newAppointment });
});

// Endpoint to retrieve all appointments
app.get('/api/appointments', (req, res) => {
  res.json(appointments);
});

// Start the server
app.listen(port, () => {
  console.log(`Appointment API is running at http://localhost:${port}`);
});