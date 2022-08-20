INSERT INTO departments
  (name)
VALUES
  ('Marketing'),
  ('HR');

INSERT INTO roles 
  (name, salary, departments_id)
VALUES
  ('Marketing Rep', 30, 1),
  ('Marketing Manager', 40, 1),
  ('HR Rep', 35, 2),
  ('HR Manager', 45, 2);

INSERT INTO employees
  (first_name, last_name, roles_id, manager_id)
VALUES
  ('Mike', 'Smith', 2, NULL),
  ('Bill', 'Conway', 1, 1),
  ('Fank', 'Dunham', 1, 1),
  ('Lisa', 'Turner', 4, NULL),
  ('Shelby', 'Carlson', 3, 4);