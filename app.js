// app.js

const express = require('express');
const app = express();
const knex = require('./knex');

// Serve static files from the 'public' folder
app.use(express.static('public'));

app.use(express.json());

// Create a new patient
app.post('/patients', async (req, res) => {
    try {
        const {first_name, last_name, date_of_birth, gender, contact_number } = req.body;
        const [newPatient] = await knex('patients').insert({first_name, last_name, date_of_birth, gender, contact_number }).returning('*');
        res.json(newPatient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not create a new patient' });
    }
});

// Retrieve a specific patient by First and Last Name
app.get('/patients', async (req, res) => {
    try {
        const { firstName, lastName } = req.query;

        // Construct a query with the LIKE operator for partial matches (wildcard search)
        const patients = await knex('patients')
            .where('first_name', 'LIKE', `%${firstName}%`)
            .andWhere('last_name', 'LIKE', `%${lastName}%`);

        if (patients.length > 0) {
            res.json(patients);
        } else {
            res.status(404).json({ error: 'Patient not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not retrieve the patient' });
    }
});

// Update a patient by ID
app.put('/patients/:id', async (req, res) => {
    const patientId = req.params.id;
    const data = req.body;

    try {
        // Update the patient's information in the database
        await knex('patients')
            .where('patient_id', patientId)
            .update(data);

        res.json({ message: 'Patient updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a patient by ID
app.delete('/patients/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await knex('patients').where({ patient_id: id }).del();
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not delete the patient' });
    }
});

// Add similar routes for Doctors, Appointments, and Prescriptions here

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
