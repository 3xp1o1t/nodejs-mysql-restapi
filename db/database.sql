CREATE DATABASE IF NOT EXISTS companydb;

USE companydb;

CREATE TABLE employee (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) DEFAULT NULL,
  salary INT(5) DEFAULT NULL,
  PRIMARY KEY(id)
);

INSERT INTO employee VALUES 
  (1, "Pedro", 1000),
  (2, "Pablo", 2500),
  (3, "Julia", 6000),
  (4, "Carmen", 10000);