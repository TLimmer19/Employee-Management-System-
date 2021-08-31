const mysql = require('mysql12');
const express = require('express');
const index = require('./index');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password123',
    database: 'companyRoster_db',
}, console.log('Sucessful connection to database.'));

app.use((req, res) => {
    res.status(404).end();
});
app.listen(PORT, () => {
    console.log('running on port ${PORT}');
});
module.exports = db;