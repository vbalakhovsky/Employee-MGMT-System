CREATE DATABASE ems;
USE ems;
CREATE TABLE departments (
id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR (30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT,
role_title VARCHAR(30) NOT NULL,
role_salary DECIMAL (7, 0) NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (

id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NULL,
manager_number INT NULL,
manager_id INT NULL,
PRIMARY KEY(id),
FOREIGN KEY (role_id) REFERENCES roles(id)
);

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;

SELECT * FROM departments
INNER JOIN roles ON departments.id = roles.department_id
INNER JOIN employees ON roles.id = employees.role_id;

