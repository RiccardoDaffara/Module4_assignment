const knex = require('../knexfile'); // Adjust the path

class Patient {
    static create(data) {
        return knex('patients').insert(data).returning('*');
    }

    static getAll() {
        return knex('patients').select('*');
    }

    // You can implement update and delete methods as needed.
    static update(id, changes) {
        return knex('patients').where('patient_id', id).update(changes);
    }

    static delete(id) {
        return knex('patients').where('patient_id', id).del();
    }
}

module.exports = Patient;