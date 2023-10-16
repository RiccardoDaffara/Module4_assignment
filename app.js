const express = require('express');
const knex = require('knex'); // Import the 'knex' library
const knexConfig = require('./knexfile'); // Import the 'knexfile'
require('path');
// Import the 'path' module
const app = express();

app.use(express.json());
// Serve static files from the 'public' folder
app.use(express.static('public'));

// Initialize 'knex' with the configuration from 'knexfile'
const db = knex(knexConfig.development);

// Create a new patient
app.post('/patients', async (req, res) => {
    try {
        const { first_name, last_name, date_of_birth, gender, contact_number } = req.body;
        const newPatient = await db('patients').insert({
            first_name,
            last_name,
            date_of_birth,
            gender,
            contact_number,
        });
        const createdPatient = await db('patients').where('patient_id', newPatient[0]).first();
        res.json(createdPatient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating a patient.' });
    }
});

// Retrieve patients based on a parameter (e.g., first_name)
app.get('/patients', async (req, res) => {
    try {
        const { searchParam } = req.query;
        const patients = await db('patients').where('first_name', 'ilike', `%${searchParam}%`);
        res.json(patients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching patients.' });
    }
});

// Modify a patient's information
app.put('/patients/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { modified_first_name, modified_last_name, modified_date_of_birth, modified_gender, modified_contact_number } = req.body;
        await db('patients')
            .where('patient_id', id)
            .update({
                first_name: modified_first_name,
                last_name: modified_last_name,
                date_of_birth: modified_date_of_birth,
                gender: modified_gender,
                contact_number: modified_contact_number,
            });
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the patient.' });
    }
});

// Delete a patient by ID
app.delete('/patients/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db('patients').where('patient_id', id).del();
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the patient.' });
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
