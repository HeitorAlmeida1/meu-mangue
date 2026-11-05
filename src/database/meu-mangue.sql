-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE meu_mangue;

USE meu_mangue;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(80) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	senha VARCHAR(50) NOT NULL,
	data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
) AUTO_INCREMENT = 1;

CREATE TABLE fase_vida (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(30) NOT NULL,
	descricao VARCHAR(150)
) AUTO_INCREMENT = 1;

CREATE TABLE historia (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome_musica VARCHAR(100) NOT NULL,
	artista VARCHAR(100) NOT NULL,
	data_musica DATE,
	trecho VARCHAR(140) NOT NULL,
	texto_completo TEXT NOT NULL,
	data_publicacao DATETIME DEFAULT CURRENT_TIMESTAMP,
	fk_fase_vida INT NOT NULL,
	fk_usuario INT NOT NULL,
	FOREIGN KEY (fk_fase_vida) REFERENCES fase_vida(id),
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
) AUTO_INCREMENT = 1;

INSERT INTO fase_vida VALUES
(DEFAULT, 'Infância', 'Músicas que marcaram a infância'),
(DEFAULT, 'Adolescência', 'Músicas que marcaram a adolescência'),
(DEFAULT, 'Hoje', 'Músicas que marcam o momento atual');
