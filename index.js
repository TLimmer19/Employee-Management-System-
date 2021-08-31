// const db = require('./server');
const inquirer = require('inquirer');
// const server = require('./server');
const mysql = require("mysql2")

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password123',
    database: 'companyRoster_db',
}, console.log('Sucessful connection to database.'));

db.connect( err => {
    if (err) throw err;
    initialPrompt()
})

const firstQuestion = {
    type: 'list',
    message: 'What would you like to do?',
    name: 'answer',
    choices: ['View Employees', 'Add Employee', 'Update Employee Role', 'View Roles', 'Add Roles', 'View Departments', 'Add Departments', 'Quit',],
};

function initialPrompt() {
    inquirer.prompt(firstQuestion).then((response) => {
        switch (response.answer) {
            case 'View Employees':
                viewEmployees();
                break;

            case 'Add Employee':
                employeeQuestions();
                break;

            case 'Update Employee Role':
                updateEmployee();
                break;

            case 'View Roles':
                viewRoles();
                break;

            case 'Add Roles':
                roleQuestions();
                break;

            case 'View Departments':
                viewDepartments();
                break;

            case 'Add Departments':
                departmentQuestions();
                break;

            case 'Quit':
                db.end();
                return;}
    });}

    function viewEmployees () {
        db.query(
            "SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name)AS employees_name, role.title, department.name AS department, role.salary, concat(manager.first_name, ' ', manager.last_name) AS manager_name FROM employee LEFT JOIN employee manager ON employee.manager_id = manager.id INNER JOIN role ON (role.id = employee.role_id) INNER JOIN department ON(department.id = role.department_id) ORDER BY employee.id;",
            function (err, answer) {
                if (err) {
                    console.log(err);
                }
                console.table(answer);
                //return to options
                initialPrompt();
            }
        );
    }

    function employeeQuestions(){
        inquirer.prompt([{
            type: 'input',
            message: "What is the employee's first name?",
            name: 'employees_firstName',
        },
        {
            type: 'input',
            message: "What is the employee's last name?",
            name: 'employees_lastName',
        },
        {
            type: 'input',
            message: "What is the employee's id?",
            name: 'employee_id',
        },
        {
            type: 'list',
            message: "What is the employee's role?",
            name: 'employeeRole',
            choices: [
                'Sales Manager',
                'Sales Rep',
                'Engineer Manager',
                'Software Engineer',
                'Tax Manager',
                'Tax Accountant',
                'Paralegal',
                'Attorney',],
        },
        {
            type: 'list',
            message: "Who is the employee's manager?",
            name: 'employeeManger',
            choices: [
                'Thomas Limmer',
                'Jessamyn Mctwaigan',
                'Amanda Limmer',
                'Marie Valdovinos',
                'None',],},
        ])
        .then((answer) => {
            console.log(answer);
            let employeeFirstName = answer.employee_firstName;
            let employeeLastName = answer.employee_lastName;
            let employee_id = answer.employee_id;
            let employeeRole = answer.employee_role;
            let employeeManager = answer.employee_manager;
            db.query(
                `INSERT INTO employees (first_name, last_name, id, role_id, manager_id) VALUES (${employeeFirstName}, ${employeeLastName}, ${employee_id}, ${employeeRole} ${employeeManager})`,
                (err, results) => {
                    if (err) return err;
                    console.log(`\n ${employeeFirstName} was added\n`);
                }
            ); 
            initialPrompt();
        });
    }
    function viewRoles() {
        db.query(
            "SELECT role.id, title, department.name AS department, salary FROM role INNER JOIN department ON role.department_id = department.id;",
            (err, answer) => {
                if (err) {
                    console.log(err);
                }
                console.table(answer);
                initialPrompt();
            }
        );
    }

    function roleQuestions() {
        inquirer.prompt([{
            type: 'input',
            message: "What is the name of the new role?",
            name: 'newRole',
        },
        {
            type: 'input',
            message: "What is the salary of the new role?",
            name: 'newSalary',
        },
        {
            type: 'list',
            message: "Which department does the new role belong to?",
            name: "roleDepartment",
            choices: [
                'Sales',
                'Finance',
                'Legal',
                'Engineering',],}
                
    ]).then((answer) => {
        console.log(answer);
        let newRole = answer.newName;
        let newSalary = answer.newSalary;
        let roleDepartment = answer.roleDepartment;
        db.query(
            `INSERT INTO roles(title, salary, department.name AS department) VALUES(${newRole}, ${newSalary}, ${roleDepartment});`,
            function (err, results) {
                if (err) return err;
                console.log('New Role Added');
            }
        );
        initialPrompt();
    });
    }
    function viewDepartments() {
        db.query(
            "SELECT id, name AS department FROM department;",
            (err, answer) => {
                if (err) {
                    console.log(err);
                }
                console.table(answer);
                initialPrompt();
            }
        );
    }
    function departmentQuestions() {
        inquirer.prompt([{
            type: 'input',
            message: "What is the name of the new Department?",
            name: 'newDepartmentName',},
    ]).then((answer) => {
        let newDepartmentName = answer.newDepartmentName;
        db.query(`INSERT INTO departments (name) VALUES ("${newDepartmentName}")`,
        function (err, results) {
            if (err) return err;
            console.log("\n New Department Added \n");
        });
        initialPrompt();
    });
    }


    // function updateEmployee() {
    //     inquirer.prompt([{
    //         type: 'list',
    //         message: 'Which employee would you like to update?',
    //         name: 'employeeUpdate',
    //         choices: [
    //             'Rico Perez',
    //             'Thomas Limmer',
    //             'Christyn Garcia',
    //             'Jessamyn Mctwigan',
    //             'Harrison Kidd',
    //             'Amanda Limmer',
    //             'Jacob Guiro',
    //             'Marie Valdovinos',],
    //     },])
    //     .then((answer) => {
    //         console.log(answer);
    //         let employeeUpdate = answer.employee
    //     })
    // }


