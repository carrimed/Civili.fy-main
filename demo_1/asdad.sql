CREATE DATABASE dbcivilify;
USE dbcivilify;
-- Create the CLIENT table
CREATE TABLE CLIENT (
    client_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create the LAWYER table
CREATE TABLE LAWYER (
    lawyer_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    specialization VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create the CASE table
CREATE TABLE CASESDETAILS (
    case_id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT NOT NULL,
    description TEXT,
    status VARCHAR(50),
    FOREIGN KEY (client_id) REFERENCES CLIENT(client_id) ON DELETE CASCADE
);

-- Create the REVIEW table
CREATE TABLE REVIEW (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT NOT NULL,
    lawyer_id INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    FOREIGN KEY (client_id) REFERENCES CLIENT(client_id) ON DELETE CASCADE,
    FOREIGN KEY (lawyer_id) REFERENCES LAWYER(lawyer_id) ON DELETE CASCADE
);

-- Create the APPOINTMENT table
CREATE TABLE APPOINTMENT (
    appointment_id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT NOT NULL,
    lawyer_id INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    FOREIGN KEY (client_id) REFERENCES CLIENT(client_id) ON DELETE CASCADE,
    FOREIGN KEY (lawyer_id) REFERENCES LAWYER(lawyer_id) ON DELETE CASCADE
);
