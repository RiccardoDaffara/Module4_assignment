// knexfile.js

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            database: 'assignement 4',
            user: 'postgres',
            password: 'admin',
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
};
