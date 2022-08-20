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

const createNewDepartment = (departmentName) => {
  const sql = `INSERT INTO departments (name) VALUES (?)`

  db.query(sql, departmentName, (err, result) => {
    console.log(`${departmentName} added to tracker`)
  })
}

const createNewRole = (roleName, roleSalary, roleDepartment) => {
  const sql = `INSERT INTO roles (name, salary, departments_id) VALUES (?,?,?)`

  const roleData = [ roleName, roleSalary, roleDepartment ]

  db.query(sql, roleData, (err, result) => {
    console.log(`${roleName} added to tracker`)
  })
}

const createNewEmployee = (employeeFName, employeeLName, employeeRole, employeeManager) => {
  const sql = `INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES (?,?,?,?)`

  const employeeData = [ employeeFName, employeeLName, employeeRole, employeeManager ]

  db.query(sql, employeeData, (err, result) => {
    console.log(`${employeeFName} ${employeeLName} added to tracker`)
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
      console.log('Add a department')
      console.log('===============================')
      return inquirer.prompt([
        {
          type: 'input',
          name: 'departmentName',
          message: 'What is the name of the new department?'
        }
      ])
      .then(departmentData => {
        createNewDepartment(departmentData.departmentName)
      })
    }
    else if (runOption.option === 'add a role') {
      console.log('Add a role')
      console.log('===============================')
      return inquirer.prompt([
        {
          type: 'input',
          name: 'roleName',
          message: 'What is the name of the role?'
        },
        {
          type: 'input',
          name: 'roleSalary',
          message: 'What is the salary of the role (use numbers only)?'
        },
        {
          type: 'input',
          name: 'roleDepartment',
          message: 'What is the id number of the department the role belongs to?'
        }
      ])
      .then(roleData => {
        createNewRole(roleData.roleName, roleData.roleSalary, roleData.roleDepartment)
      })
    }
    else if (runOption.option === 'add an employee') {
      console.log('Add an employee')
      console.log('===============================')
      return inquirer.prompt([
        {
          type: 'input',
          name: 'employeeFName',
          message: 'What is the first name of the employee?'
        },
        {
          type: 'input',
          name: 'employeeLName',
          message: 'What is the Last name of the employee?'
        },
        {
          type: 'input',
          name: 'employeeRole',
          message: 'What is the id number of the role for this employee?'
        },
        {
          type: 'input',
          name: 'employeeManager',
          message: 'What is the employee id number of the manager for this employee?'
        }
      ])
      .then(employeeData => {
        createNewEmployee(employeeData.employeeFName, employeeData.employeeLName, employeeData.employeeRole, employeeData.employeeManager)
      })
    }
  })
}

promptUser()