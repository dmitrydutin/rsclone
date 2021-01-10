import mysql from 'mysql';

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'eu-cdbr-west-03.cleardb.net',
    user: 'b7c53498b71d86',
    password: '1c483af8',
    database: 'heroku_97b4df1c2fb6d7d'
});

export default pool;
