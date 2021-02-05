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
  password: "2busika22",
  database: "ems"
});

connection.connect(function(err){

if(err) throw err;
console.log("EMS is working");
fireUpEMS();
});

function fireUpEMS(){

  inquirer.prompt({
    type:"list",
  name: "startSystem",
  message: "What would you like to do?",
  choices:[
"View Company By Departments",
"View Team by Roles",
"View the Roles Inside Departments",
"View Full Employee List in Each Department",
"Full Employee List",
"View What Roles are Held By all Team Members",
"Add Team Member",
"Add Department",
"Add Role",
"Exit"
  ]}).then(function(answer){
switch (answer.startSystem){
case "View Company By Departments":
  viewByDpt();
  break;

case   "View Team by Roles":
  viewByRole();
  break;

case  "View the Roles Inside Departments":
   viewRolesInDepts();
   break;

   case  "View Full Employee List in Each Department":
    viewEmployeesByDepartment();
    break;


case "Full Employee List":
  viewAllEmployees();
  break;

case   "View What Roles are Held By all Team Members":
  viewAllRolles();

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

 case  "Update the Role of an Existing Team Member":
   updateEmployeeRole();

   break;


   case "Change Employee's Manager":
     changeMgr();

break;

    case "Exit":
      exit();
      break;
  };
});

}


function viewByDpt() {
connection.query("SELECT id, department_name FROM departments",
function(err, res) {

  console.table(res);
  fireUpEMS();

});

};


function viewByRole(){

connection.query("SELECT roles.id, role_title, department_name FROM roles RIGHT JOIN departments ON roles.department_id = departments.id;",
function(err, res){
console.table(res);
fireUpEMS()
});
};

function viewAllEmployees(){

connection.query("SELECT id, first_name, last_name FROM employees",
function(err, res) {
console.table(res);
fireUpEMS()
}

);

};

function viewEmployeesByDepartment(){

connection.query("SELECT employees.id, first_name, last_name, department_name FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON roles.department_id = department.id",
function(err, res){
console.table(res);
fireUpEMS();

});



}
