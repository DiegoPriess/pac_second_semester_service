# geld-api

Banco de dados

CREATE DATABASE db_geld

CREATE TABLE users ( id integer NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL);

CREATE TABLE accounts ( id integer NOT NULL PRIMARY KEY AUTO_INCREMENT, description VARCHAR(100) NOT NULL, date date NOT NULL, price numeric(16,2), type VARCHAR(20), status VARCHAR(20), id_users bigint REFERENCES users (id));
