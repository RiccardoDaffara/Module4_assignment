-- Insert data into the Patients table
INSERT INTO patients (patient_id, first_name, last_name, date_of_birth, gender, contact_number)
VALUES
    (1, 'John', 'Doe', '1990-05-15', 'Male', '123-456-7890'),
    (2, 'Jane', 'Smith', '1985-09-22', 'Female', '987-654-3210'),
    (3, 'Robert', 'Johnson', '1978-03-10', 'Male', '555-111-2222'),
    (4, 'Emily', 'Davis', '1995-12-05', 'Female', '555-222-3333'),
    (5, 'Maria', 'Garcia', '1987-08-20', 'Female', '555-333-4444'),
    (6, 'James', 'Smith', '1975-02-28', 'Male', '555-555-6666'),
    (7, 'Ella', 'Martinez', '1993-04-17', 'Female', '555-777-8888'),
    (8, 'William', 'Brown', '1970-11-25', 'Male', '555-888-9999');

-- Insert data into the Doctors table
INSERT INTO doctors (doctor_id, first_name, last_name, specialization, contact_number)
VALUES
    (1, 'Dr. Michael', 'Johnson', 'Cardiologist', '555-123-4567'),
    (2, 'Dr. Emily', 'Davis', 'Pediatrician', '555-987-6543'),
    (3, 'Dr. Sarah', 'Brown', 'Dermatologist', '555-444-5555'),
    (4, 'Dr. David', 'Wilson', 'Orthopedic Surgeon', '555-777-8888'),
    (5, 'Dr. Lisa', 'Clark', 'Gynecologist', '555-888-9999'),
    (6, 'Dr. Laura', 'Adams', 'Psychiatrist', '555-666-5555'),
    (7, 'Dr. Andrew', 'Lee', 'Ophthalmologist', '555-222-1111');

-- Insert data into the Appointments table
INSERT INTO appointments (appointment_id, patient_id, doctor_id, appointment_date, diagnosis)
VALUES
    (1, 1, 1, '2023-10-05 09:00:00', 'Hypertension checkup'),
    (2, 2, 2, '2023-10-06 10:30:00', 'Childhood vaccinations'),
    (3, 3, 3, '2023-10-07 14:15:00', 'Acne treatment'),
    (4, 4, 4, '2023-10-08 11:45:00', 'Knee surgery'),
    (5, 2, 2, '2023-10-09 13:30:00', 'Migraine evaluation'),
    (6, 6, 1, '2023-10-10 15:00:00', 'Chemotherapy session'),
    (7, 7, 3, '2023-10-11 09:30:00', 'Depression evaluation'),
    (8, 8, 4, '2023-10-12 14:45:00', 'Eye examination'),
    (9, 7, 6, '2023-10-13 10:15:00', 'Therapy session'),
    (10, 8, 7, '2023-10-14 11:00:00', 'Vision checkup');

-- Insert data into the Prescriptions table
INSERT INTO prescriptions (prescription_id, patient_id, doctor_id, prescription_date, medication_name, dosage)
VALUES
    (1, 1, 1, '2023-10-05', 'Lisinopril', '10mg once daily'),
    (2, 2, 2, '2023-10-06', 'Pediarix', 'As per vaccination schedule'),
    (3, 3, 3, '2023-10-07', 'Retin-A', 'Apply at bedtime'),
    (4, 4, 4, '2023-10-08', 'Ibuprofen', '200mg every 6 hours'),
    (5, 5, 5, '2023-10-09', 'Topiramate', '50mg twice daily'),
    (6, 6, 6, '2023-10-10', 'Cisplatin', 'Administered intravenously'),
    (7, 7, 3, '2023-10-11', 'Prozac', '20mg daily'),
    (8, 8, 4, '2023-10-12', 'Visine', 'As needed'),
    (9, 7, 6, '2023-10-13', 'Xanax', '0.5mg as directed'),
    (10, 8, 7, '2023-10-14', 'Brimonidine', 'One drop in each eye twice daily');
