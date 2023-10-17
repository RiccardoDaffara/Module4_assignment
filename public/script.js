document.addEventListener('DOMContentLoaded', () => {
    // Select the form and HTML elements
    const createPatientForm = document.getElementById('createPatientForm');
    const retrievePatientsButton = document.getElementById('retrievePatientsButton');
    const patientListUl = document.getElementById('patientListUl');
    const updatePatientResult = document.getElementById('updatePatientResult');
    const deletePatientButton = document.getElementById('deletePatientButton');
    const deletePatientResult = document.getElementById('deletePatientResult');

    // Add a submit event listener to the form
    createPatientForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Get input values
        const first_name = document.getElementById('first_name').value;
        const last_name = document.getElementById('last_name').value;
        const dobInput = document.getElementById('date_of_birth');
        const date_of_birth = formatDate(dobInput.value); // Convert the date format
        const gender = document.getElementById('gender').value;
        const contact_number = document.getElementById('contact_number').value;

        // Create a data object to send in the POST request
        const data = {
            first_name,
            last_name,
            date_of_birth,
            gender,
            contact_number,
        };

        // Send a POST request to the /patients route
        fetch('/patients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error creating patient');
                }
                return response.json();
            })
            .then((newPatient) => {
                // Update the HTML to display the newly created patient
                const li = document.createElement('li');
                li.textContent = `Patient ID: ${newPatient.patient_id}, First Name: ${newPatient.first_name}, Last Name: ${newPatient.last_name}, DOB: ${newPatient.date_of_birth}, Gender: ${newPatient.gender}, Contact Number: ${newPatient.contact_number}`;
                patientListUl.appendChild(li); // Append to the patient list

                // Clear the form inputs
                createPatientForm.reset();

                // Update the result message
                const createPatientResult = document.getElementById('createPatientResult');
                createPatientResult.textContent = 'Patient created successfully';
            })
            .catch((error) => console.error('Error:', error));
    });

    retrievePatientsButton.addEventListener('click', async () => {
        const firstName = document.getElementById('retrievePatientFirstName').value;
        const lastName = document.getElementById('retrievePatientLastName').value;

        try {
            // Send a GET request to retrieve patients by First and Last Name
            const response = await fetch(`/patients?firstName=${firstName}&lastName=${lastName}`);

            if (!response.ok) {
                // Handle errors
                if (response.status === 404) {
                    console.error('Patient not found');
                    patientListUl.innerHTML = 'Patient not found';
                } else {
                    console.error('Error fetching patient data');
                    patientListUl.innerHTML = 'Error fetching patient data';
                }
            } else {
                const patients = await response.json();

                // Clear the existing patient list
                patientListUl.innerHTML = '';

                if (Array.isArray(patients) && patients.length > 0) {
                    // Display the retrieved patients' data
                    patients.forEach(patient => {
                        const li = document.createElement('li');
                        li.innerHTML = `
                        <strong>Patient ID:</strong> ${patient.patient_id}<br>
                        <strong>First Name:</strong> ${patient.first_name}<br>
                        <strong>Last Name:</strong> ${patient.last_name}<br>
                        <strong>Date of Birth:</strong> ${formatDate(patient.date_of_birth)}<br>
                        <strong>Gender:</strong> ${patient.gender}<br>
                        <strong>Contact Number:</strong> ${patient.contact_number}
                    `;
                        patientListUl.appendChild(li);
                    });
                } else {
                    console.error('No patients found');
                    patientListUl.innerHTML = 'No patients found';
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });


    // Update a patient by ID
    const updatePatientForm = document.getElementById('updatePatientForm');

    updatePatientForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const patientId = document.getElementById('updatePatientId').value;
        const firstName = document.getElementById('updateFirstName').value;
        const lastName = document.getElementById('updateLastName').value;
        const dateOfBirth = document.getElementById('updateDateOfBirth').value;
        const contact = document.getElementById('updateContact').value;
        const gender = document.getElementById('updateGender').value;

        const data = {
            first_name: firstName,
            last_name: lastName,
            date_of_birth: dateOfBirth,
            contact_number: contact,
            gender: gender,
        };

        // Send a PUT request to update the patient
        fetch(`/patients/${patientId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then(() => {
                updatePatientResult.textContent = 'Patient updated successfully';
                updatePatientForm.reset();
            })
            .catch((error) => console.error('Error:', error));
    });

    // Delete a patient
    deletePatientButton.addEventListener('click', () => {
        const patientId = document.getElementById('deletePatientId').value;

        // Send a DELETE request to delete the patient
        fetch(`/patients/${patientId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.status === 404) {
                    return Promise.reject('Patient not found');
                }
                return response.json();
            })
            .then(() => {
                deletePatientResult.textContent = 'Patient deleted successfully';
            })
            .catch((error) => {
                if (error === 'Patient not found') {
                    console.error('Patient not found');
                    deletePatientResult.textContent = 'Patient not found';
                } else {
                    console.error('Error:', error);
                }
            });
    });
});

// Function to format date as yyyy/mm/dd
function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}
