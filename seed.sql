insert into departments (department_name)
values ("Corporate Team"),
("Management"),
("IT"),
("Accounting"),
("HR");

insert into roles (role_title, role_salary, department_id)
values ("President", 500000, 1),
("Project Manager", 150000, 2),
("CTO", 200000, 3),
("Front-End Developer", 75000, 3),
("Junior Associate", 50000, 3),
("Sales Manager", 100000, 2),
("Book-keeper", 27000, 4),
("Head of Accounting", 150000, 4),
("Compliance Officer", 200000, 5),
("On-boarding Manager", 70000,5),
("Head of Recruiting", 300000, 5),
("Office Administrator", 50000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_number, manager_id)
values ("Puppy", "Cute", 1, null, null),
		("Kitten", "Funny", 2, 1, null),
		("Crocodile", "Green", 3, 2, 1),
        ("Platipus", "Cool", 4, NULL, 2),
        ("Tiger", "Awesome", 5, NULL, 2),
        ("Cat", "Chill", 6, NULL, 2),
        ("Bond", "James", 7, 3, 1),
        ("Giraffe", "Long", 8, NULL, 3),
        ("Elephant", "Fantastic", 9, NULL, 3),
        ("Zebra", "Supersonic", 10, NULL, 3),
        ("Antelope","Unsptoppable", 11, 4, 1),
        ("Wolverine","Glorious", 12, NULL, 4),
        ("Manul", "Invincible", 13, NULL, 4),
        ("Lion", "Mane", 14, NULL, 4);







