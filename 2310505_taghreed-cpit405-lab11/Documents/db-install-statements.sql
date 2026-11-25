-- Student Name: Taghreed Mohammed Almalki
-- Student ID: 2310505
-- Course: CPIT-405
-- Lab 10: PHP and MariaDB

CREATE DATABASE IF NOT EXISTS cpit405_lab10;

USE cpit405_lab10;

CREATE TABLE IF NOT EXISTS professors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    salary DECIMAL(10,2) NOT NULL
);

INSERT INTO professors (name, salary)
VALUES
('Dr. Ahmed', 15000.00),
('Dr. Sara', 18000.00);
