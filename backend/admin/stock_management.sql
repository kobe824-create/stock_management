-- Create the database
CREATE DATABASE IF NOT EXISTS stock_management;

-- Use the database
USE stock_management;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_names VARCHAR(255) NOT NULL,
    teacher_trade VARCHAR(255) NOT NULL,
    teacher_email VARCHAR(255) NOT NULL UNIQUE,
    teacher_password VARCHAR(255) NOT NULL
);

-- Create the departments table
CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create the requests table
CREATE TABLE IF NOT EXISTS requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    requested_by INT NOT NULL,
    department_id INT NOT NULL,
    items TEXT NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (requested_by) REFERENCES users(id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Create the BDC stock table
CREATE TABLE IF NOT EXISTS bdc_stock (
    id INT AUTO_INCREMENT PRIMARY KEY,
    toolname VARCHAR(255) NOT NULL,
    availableinstock INT NOT NULL
);

-- Create the SOD stock table
CREATE TABLE IF NOT EXISTS sod_stock (
    id INT AUTO_INCREMENT PRIMARY KEY,
    toolname VARCHAR(255) NOT NULL,
    availableinstock INT NOT NULL
);

-- Create the PBW stock table
CREATE TABLE IF NOT EXISTS pbw_stock (
    id INT AUTO_INCREMENT PRIMARY KEY,
    toolname VARCHAR(255) NOT NULL,
    availableinstock INT NOT NULL
);

-- Create the CSA stock table
CREATE TABLE IF NOT EXISTS csa_stock (
    id INT AUTO_INCREMENT PRIMARY KEY,
    toolname VARCHAR(255) NOT NULL,
    availableinstock INT NOT NULL
);

-- Create the usage table (example)
CREATE TABLE IF NOT EXISTS usage (
    id INT AUTO_INCREMENT PRIMARY KEY,
    toolname VARCHAR(255) NOT NULL,
    used_by INT NOT NULL,
    date DATE NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (used_by) REFERENCES users(id)
);