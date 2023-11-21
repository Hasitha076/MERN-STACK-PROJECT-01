DROP DATABSE IF EXISTS Student_Management_System;
CREATE DATABSE IF NOT EXISTS Student_Management_System;
USE Student_Management_System;

DROP TABLE IF EXISTS student;
CREATE TABLE IF NOT EXISTS student(
    nic VARCHAR(45) PRIMARY KEY,
    name VARCHAR(45),
    mobile INT,
    address VARCHAR(250)
);

DROP TABLE IF EXISTS program;
CREATE TABLE IF NOT EXISTS program (
    id INT PRIMARY KEY,
    module_name VARCHAR(45) UNIQUE,
    duration INT,
    price DOUBLE
);

DROP TABLE IF EXISTS registration;
CREATE TABLE IF NOT EXISTS registration(
    id INT PRIMARY KEY,
    student_name VARCHAR(50),
    module_name VARCHAR(45),
    register_date DATE
);



