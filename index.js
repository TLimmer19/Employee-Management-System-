const db = require('.server');
const inquirer = require('inquirer');
const server = require('./server');

const firstQuestion = {
    type: 'list',
    message: 'What would you like to do?',
    name: 'answer',
    choices: ['View Employees', 'Add Employee', 'Update Employee Role', 'View Roles', 'Add Roles', 'View Departments', 'Add Departments', 'Quit',],
};