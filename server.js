var mysql = require("mysql");
var inquirer = require("inquirer");
const { allowedNodeEnvironmentFlags, exit } = require("process");
const { identity } = require("rxjs");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "ems"
});

connection.connect(function (err) {

  if (err) throw err;
  console.log("EMS is working");
  fireUpEMS();
});

function fireUpEMS() {

  inquirer.prompt({
    type: "list",
    name: "startSystem",
    message: "What would you like to do?",
    choices: [
      "View Company By Departments",
      "View Team by Roles",
      "View the Roles Inside Departments",
      "View Full Employee List in Each Department",
      "Full Employee List",
      "View What Roles are Held By all Team Members",
      "Complete Team Profile",
      "Add Team Member",
      "Add Department",
      "Add Role",
      "Update the Role of an Existing Team Member",
      "Delete an employee",
      "Exit"
    ]
  }).then(function (answer) {
    switch (answer.startSystem) {
      case "View Company By Departments":
        viewByDpt();
        break;

      case "View Team by Roles":
        viewByRole();
        break;

      case "View the Roles Inside Departments":
        viewRolesInDepts();
        break;

      case "View Full Employee List in Each Department":
        viewEmployeesByDepartment();
        break;


      case "Full Employee List":
        viewAllEmployees();
        break;

      case "View What Roles are Held By all Team Members":
        viewAllRoles();

        break;

      case "Complete Team Profile":
        fullProfile();
        break;

      case "Add Team Member":
        addTeamMemeber();

        break;

      case "Add Department":
        addDepartment();

        break;

      case "Add Role":
        addRole();

        break;

      case "Update the Role of an Existing Team Member":
        updateEmployeeRole();

        break;


      case "Delete an employee":
        deleteE();

        break;

      case "Exit":
        exitM();
        break;
    };
  });

}

function fullProfile() {

  connection.query("SELECT * FROM employees INNER JOIN roles ON roles.id = employees.role_id",
    function (err, res) {
      console.table(res);
      fireUpEMS();
    });

};


function viewByDpt() {
  connection.query("SELECT id, department_name FROM departments",
    function (err, res) {

      console.table(res);
      fireUpEMS();

    });

};


function viewByRole() {

  connection.query("SELECT roles.id, role_title, department_name FROM roles RIGHT JOIN departments ON roles.department_id = departments.id;",
    function (err, res) {
      console.table(res);
      fireUpEMS()
    });
};

function viewAllEmployees() {

  connection.query("SELECT id, first_name, last_name FROM employees",
    function (err, res) {
      console.table(res);
      fireUpEMS()
    }

  );

};

function viewEmployeesByDepartment() {
  connection.query("SELECT employees.id,first_name,last_name,department_name FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id;",
    function (err, res) {
      console.table(res);
      fireUpEMS();
    });
};

function viewRolesInDepts() {
  connection.query("SELECT roles.id,role_title,department_name FROM roles RIGHT JOIN departments ON roles.department_id = departments.id;",
    function (err, res) {
      console.table(res);
      fireUpEMS();
    });
};

function viewAllRoles() {

  connection.query("SELECT id,role_title,role_salary FROM roles",
    function (err, res) {
      console.table(res);
      fireUpEMS();
    });
};

function addTeamMemeber() {
  const questionaire = [{
    type: "input",
    name: "FirstName",
    message: "Please Enter the First Name of the New Team Member",
  },

  {
    type: "input",
    name: "LastName",
    message: "Please Enter the Last Name of the New Team Member",
  },

  {
    type: "input",
    name: "RoleNumber",
    message: "Please enter the role id number, which can be found in the Full List of Roles, or can a new role id can be created later"
  }
  ]
  inquirer.prompt(questionaire).then(data =>
    connection.query("INSERT INTO employees SET ?",
      {
        first_name: data.FirstName,
        last_name: data.LastName,
        role_id: data.RoleNumber
      },
      function (err, res) {
        console.log("Team Member added to roster");
        fireUpEMS();
      })
  );

};

function addDepartment() {
  inquirer.prompt({
    type: "input",
    name: "DepartmentName",
    message: "Please enter the name of the department you want to create: ",
  }).then(data =>
    connection.query("INSERT INTO departments SET ?",
      {
        department_name: data.DepartmentName,

      },
      function (err, res) {
        console.log("New Department Created");
        fireUpEMS();
      }));

};

function addRole() {

  const roleQ =

    [{
      type: "input",
      name: "RoleName",
      message: "Please enter the new role you would like to create: ",
    },

    {
      type: "input",
      name: "RoleSalary",
      message: "Please enter the salary for the new role",
    },

    {
      type: "input",
      name: "DepartmentID",
      message: "Please Enter the id of department, in which you are adding the role ",
    }]
  inquirer.prompt(roleQ).then(data =>
    connection.query("INSERT INTO roles SET ?",
      {
        role_title: data.RoleName,
        role_salary: data.RoleSalary,
        department_id: data.DepartmentID,
      },
      function (err, res) {
        console.log("Role Created");
        fireUpEMS();
      })
  );
};

function exitM() {

  console.log("Ciao, happy Managing!");

};


function updateEmployeeRole() {
  connection.query("SELECT * FROM employees",
    function (err, res) {
      if (err) throw err;
      inquirer
        .prompt([{

          name: "choice",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push(res[i].last_name);
             
            }
            return choiceArray;


          },

          message: "Which employee role you would like to update?"

        },

        {
          name: "newRole",
          type: "input",
          message: "Please enter new role"


        }
        ])
        .then(function (answer) {

          var chosenItem;
          for (var i = 0; i < res.length; i++) {
            if (res[i].last_name === answer.choice) {

              chosenItem = res[i];
            }
          }
          connection.query(

            "Update employees SET ? WHERE ?",
            [
              { role_id: answer.newRole },
              { id: chosenItem.id }

            ],

            function (error) {
              if (error) throw err;
              console.log("role updated");
              fireUpEMS();
            }
          );
        })
      }
  )}

  function deleteE() {
    connection.query("SELECT * FROM employees",
      function (err, res) {
        if (err) throw err;
        inquirer
          .prompt([{
  
            name: "choice",
            type: "rawlist",
            choices: function () {
              var choiceArray = [];
              for (var i = 0; i < res.length; i++) {
                choiceArray.push(res[i].last_name);
              
              }
              return choiceArray;
  
  
            },
  
            message: "Which employee you would like to delete?"
  
          }
  
         
          ])
          .then(function (answer) {
  
            var chosenItem;
            for (var i = 0; i < res.length; i++) {
              if (res[i].last_name === answer.choice) {
  
                chosenItem = res[i];
              }
            }
            connection.query(
              "DELETE FROM employees WHERE id = ?",
             
              [
                
                { id: chosenItem.id }
  
              ],
  
              function (error) {
                if (error) throw err;
                console.log("Fired!");
                fireUpEMS();
              }
            );
          })
        }
    )}


