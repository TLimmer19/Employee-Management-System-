
INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Finance'),
    ('Legal'),
    ('Engineering');
INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Manager', 80000, 4),
    ('Sales Rep', 50000, 4),
    ('Engineer Manager', 130000, 1),
    ('Software Engineer', 105000, 1),
    ('Tax Manager', 150000, 2),
    ('Tax Accountant', 115000, 2),
    ('Paralegal', 70000, 3),
    ('Attorney', 200000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Rico', 'Perez', 1, null),
    ('Thomas', 'Limmer', 2, 1),
    ('Christyn', 'Garcia', 3, null),
    ('Jessamyn', 'Mctwigan', 4, 3),
    ('Harrison', 'Kidd', 5, null),
    ('Amanda', 'Limmer', 6, 5),
    ('Jacob', 'Guiro', 7, null),
    ('Marie', 'Valdovinos', 8, 7);
    