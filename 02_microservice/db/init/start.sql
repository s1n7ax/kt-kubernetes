CREATE DATABASE vote;

USE vote;

CREATE TABLE animals (
	id int NOT NULL,
	name varchar(50),
	PRIMARY KEY(id)
);

CREATE TABLE votes (
	animalid int NOT NULL,
	FOREIGN KEY (animalid) REFERENCES animals(id)
);

INSERT INTO animals VALUES
	(1, 'Cat'),
	(2, 'Dog');
