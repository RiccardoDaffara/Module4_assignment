const express = require('express');
const router = express.Router();
const Patient = require('../models/patients');

router.post('/patients', async (req, res) => {
    const { first_name, last_name, date_of_birth, gender, contact_number } = req.body;

    try {
        const result = await Patient.create({
            first_name,
            last_name,
            date_of_birth,
            gender,
            contact_number,
        });
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/patients', async (req, res) => {
    try {
        const patients = await Patient.getAll();
        res.json(patients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/patients/:id', async (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    try {
        await Patient.update(id, changes);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/patients/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await Patient.delete(id);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
