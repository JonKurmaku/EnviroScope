-- Create the database
CREATE DATABASE IF NOT EXISTS enviro_scope;

-- Switch to the database
USE enviro_scope;

-- Create the sensor1 table
CREATE TABLE IF NOT EXISTS sensor1 (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_chunk VARCHAR(255),
  second_chunk VARCHAR(255),
  third_chunk VARCHAR(255),
  fourth_chunk VARCHAR(255),
  fifth_chunk VARCHAR(255)
);

-- Create the sensor1final table
CREATE TABLE sensor1final (
    id INT AUTO_INCREMENT PRIMARY KEY,
    humidity DOUBLE,
    temperature DOUBLE,
    checksum DOUBLE
);