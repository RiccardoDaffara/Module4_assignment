// Create Patient Form
const createPatientForm = document.getElementById('create-patient-form');
createPatientForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(createPatientForm);
    const response = await fetch('/patients', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    displayPatientData(data);
    createPatientForm.reset(); // Clear the form after submission
});

// Search Patients
const searchButton = document.getElementById('searchButton');
const searchParamInput = document.getElementById('searchParam');
searchButton.addEventListener('click', async () => {
    const searchParam = searchParamInput.value;
    const response = await fetch(`/patients?searchParam=${searchParam}`);
    const data = await response.json();
    displayPatientData(data);
});

// Function to display patient data
function displayPatientData(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (Array.isArray(data)) {
        if (data.length === 0) {
            resultsDiv.textContent = 'No patients found.';
        } else {
            data.forEach((patient) => {
                displayIndividualPatient(resultsDiv, patient);
            });
        }
    } else {
        displayIndividualPatient(resultsDiv, data);
    }
}

// Function to display an individual patient's data
function displayIndividualPatient(resultsDiv, patient) {
    const patientInfo = document.createElement('div');
    patientInfo.className = 'patient-info';
    patientInfo.innerHTML = `
        <p><strong>Name:</strong> ${patient.first_name} ${patient.last_name}</p>
        <p><strong>Date of Birth:</strong> ${patient.date_of_birth}</p>
        <p><strong>Gender:</strong> ${patient.gender}</p>
        <p><strong>Contact Number:</strong> ${patient.contact_number}</p>
        <button class="modify-button" data-id="${patient.patient_id}">Modify</button>
        <button class="delete-button" data-id="${patient.patient_id}">Delete</button>
    `;
    resultsDiv.appendChild(patientInfo);

    // Add event listeners for Modify and Delete buttons
    const modifyButtons = resultsDiv.getElementsByClassName('modify-button');
    for (const button of modifyButtons) {
        button.addEventListener('click', () => {
            const patientId = button.getAttribute('data-id');
            modifyPatientForm.style.display = 'block';
            populateModifyForm(patientId);
        });
    }

    const deleteButtons = resultsDiv.getElementsByClassName('delete-button');
    for (const button of deleteButtons) {
        button.addEventListener('click', () => {
            const patientId = button.getAttribute('data-id');
            deletePatient(patientId);
        });
    }
}

// Modify Patient Form
const modifyPatientForm = document.getElementById('modify-patient-form');
modifyPatientForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const patientId = document.getElementById('patientId').value;
    const modifiedData = new FormData(modifyPatientForm);
    const response = await fetch(`/patients/${patientId}`, {
        method: 'PUT',
        body: JSON.stringify(Object.fromEntries(modifiedData)),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    if (data.success) {
        modifyPatientForm.style.display = 'none';
        searchButton.click(); // Refresh the search results after modification
    }
});

// Populate Modify Form with Patient Data
function populateModifyForm(patientId) {
    modifyPatientForm.style.display = 'block';
    const patientInfo = document.getElementById('results').getElementsByClassName('patient-info');
    for (const info of patientInfo) {
        const id = info.getElementsByTagName('button')[0].getAttribute('data-id');
        if (id === patientId) {
            const name = info.getElementsByTagName('p')[0].textContent.split(': ')[1].split(' ');
            const dateOfBirth = info.getElementsByTagName('p')[1].textContent.split(': ')[1];
            const gender = info.getElementsByTagName('p')[2].textContent.split(': ')[1];
            const contactNumber = info.getElementsByTagName('p')[3].textContent.split(': ')[1];
            document.getElementById('patientId').value = patientId;
            document.getElementById('modified_first_name').value = name[0];
            document.getElementById('modified_last_name').value = name[1];
            document.getElementById('modified_date_of_birth').value = dateOfBirth;
            document.getElementById('modified_gender').value = gender;
            document.getElementById('modified_contact_number').value = contactNumber;
            break;
        }
    }
}

// Delete a patient
function deletePatient(patientId) {
    const confirmDelete = confirm('Are you sure you want to delete this patient?');
    if (confirmDelete) {
        fetch(`/patients/${patientId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    searchButton.click(); // Refresh the search results after deletion
                }
            })
            .catch((error) => console.error('Error deleting patient: ', error));
    }
}