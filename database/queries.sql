-- Query 1: Retrieve patient information and the corresponding doctor's name for each appointment.
SELECT p.first_name || ' ' || p.last_name AS "Patient Name", d.first_name || ' ' || d.last_name AS "Doctor Name"
FROM appointments AS a
         JOIN patients AS p ON a.patient_id = p.patient_id
         JOIN doctors AS d ON a.doctor_id = d.doctor_id;

-- Query 2: List all doctors and their specializations.
SELECT first_name || ' ' || last_name AS "Doctor Name", specialization
FROM doctors;

-- Query 3: Find the total number of appointments for each doctor.
SELECT d.first_name || ' ' || d.last_name AS "Doctor Name", COUNT(*) AS "Total Appointments"
FROM appointments AS a
         JOIN doctors AS d ON a.doctor_id = d.doctor_id
GROUP BY d.first_name, d.last_name;

-- Query 4: Retrieve patient names and their associated prescriptions.
SELECT p.first_name || ' ' || p.last_name AS "Patient Name", pr.medication_name, pr.dosage
FROM prescriptions AS pr
         JOIN patients AS p ON pr.patient_id = p.patient_id;

-- Query 5: Find the youngest and oldest patients.
SELECT
    (SELECT first_name || ' ' || last_name FROM patients ORDER BY date_of_birth LIMIT 1)      AS "Youngest Patient",
    (SELECT first_name || ' ' || last_name FROM patients ORDER BY date_of_birth DESC LIMIT 1) AS "Oldest Patient";

-- Query 6: List patients who have no appointments.
SELECT
        p.first_name || ' ' || p.last_name AS "Patient Name"
FROM patients AS p
         LEFT JOIN appointments AS a ON p.patient_id = a.patient_id
WHERE a.appointment_id IS NULL;