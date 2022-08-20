const db = require('./db/connection')
const inquirer = require('inquirer')
const cTable = require('console.table')

const displayDepartments = () => {
  const sql = `SELECT departments.name AS Department FROM departments`

  db.query(sql, (err, rows) => {
    const table = cTable.getTable(rows)
    console.log(table)
  })
}

const displayRoles = () => {
  const sql = `SELECT roles.name AS Role,
                departments.name AS Department
                FROM roles
                LEFT JOIN departments
                ON roles.departments_id = departments.id`

  db.query(sql, (err, rows) => {
    const table = cTable.getTable(rows)
    console.log(table)
  })
}

const displayEmployees = () => {
  const sql = `SELECT e.first_name AS 'First Name',
              e.last_name AS 'Last Name',
              departments.name AS Department,
              roles.name AS Role,
              roles.salary AS Salary,
              CONCAT(m.first_name,' ',m.last_name) AS Manager
              FROM employees e
              LEFT JOIN employees m ON e.manager_id = m.id
              INNER JOIN roles ON e.roles_id = roles.id
              INNER JOIN departments ON roles.departments_id = departments.id
              `

  db.query(sql, (err, rows) => {
    const table = cTable.getTable(rows)
    console.log(table)
  })
}

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'What would you like to do?',
      choices: [
        'view all departments',
        'view all roles',
        'view all employees',
        'add a department',
        'add a role',
        'add an employee'
      ]
    }
  ])
  .then(runOption => {
    if (runOption.option === 'view all departments') {
      console.log('Showing all departments')
      console.log('===============================')
      displayDepartments()
    }
    else if (runOption.option === 'view all roles') {
      console.log('Showing all roles')
      console.log('===============================')
      displayRoles()
    }
    else if (runOption.option === 'view all employees') {
      console.log('Showing all employees')
      console.log('===============================')
      displayEmployees()
    }
    else if (runOption.option === 'add a department') {
      console.log('add a department')
    }
    else if (runOption.option === 'add a role') {
      console.log('add a role')
    }
    else if (runOption.option === 'add an employee') {
      console.log('add an employee')
    }
  })
}

promptUser()