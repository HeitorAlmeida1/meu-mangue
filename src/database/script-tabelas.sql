-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE aquatech;

USE aquatech;

CREATE TABLE empresa (
	id INT PRIMARY KEY AUTO_INCREMENT,
	razao_social VARCHAR(50),
	cnpj CHAR(14),
	codigo_ativacao VARCHAR(50)
);

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
	tipo_usuario VARCHAR(20) NOT NULL,
	fk_empresa INT,
	FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
);

CREATE TABLE aviso (
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

create table aquario (
/* em nossa regra de negócio, um aquario tem apenas um sensor */
	id INT PRIMARY KEY AUTO_INCREMENT,
	descricao VARCHAR(300),
	tipo_agua VARCHAR(20) NOT NULL,
	fk_empresa INT,
	FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
);

create table especie (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(120) NOT NULL,
	nome_normalizado VARCHAR(120) NOT NULL,
	tipo_agua VARCHAR(20) NOT NULL,
	tamanho_medio_cm DECIMAL(5,2) NOT NULL,
	status_aprovacao VARCHAR(20) NOT NULL DEFAULT 'PENDENTE',
	fk_empresa INT NOT NULL,
	fk_usuario_criador INT NOT NULL,
	fk_usuario_aprovador INT,
	data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	data_aprovacao DATETIME,
	CONSTRAINT uq_especie_nome_empresa UNIQUE (fk_empresa, nome_normalizado),
	FOREIGN KEY (fk_empresa) REFERENCES empresa(id),
	FOREIGN KEY (fk_usuario_criador) REFERENCES usuario(id),
	FOREIGN KEY (fk_usuario_aprovador) REFERENCES usuario(id)
);

create table especie_aquario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	fk_especie INT NOT NULL,
	fk_aquario INT NOT NULL,
	status_aprovacao VARCHAR(20) NOT NULL DEFAULT 'PENDENTE',
	fk_usuario_solicitante INT NOT NULL,
	fk_usuario_aprovador INT,
	data_solicitacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	data_aprovacao DATETIME,
	CONSTRAINT uq_especie_aquario UNIQUE (fk_especie, fk_aquario),
	FOREIGN KEY (fk_especie) REFERENCES especie(id),
	FOREIGN KEY (fk_aquario) REFERENCES aquario(id),
	FOREIGN KEY (fk_usuario_solicitante) REFERENCES usuario(id),
	FOREIGN KEY (fk_usuario_aprovador) REFERENCES usuario(id)
);

/* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */

create table medida (
	id INT PRIMARY KEY AUTO_INCREMENT,
	temperatura DECIMAL,
	momento DATETIME,
	fk_aquario INT,
	FOREIGN KEY (fk_aquario) REFERENCES aquario(id)
);

insert into empresa (razao_social, codigo_ativacao) values ('Empresa 1', 'ED145B');
insert into empresa (razao_social, codigo_ativacao) values ('Empresa 2', 'A1B2C3');
insert into aquario (descricao, tipo_agua, fk_empresa) values ('Aquário de Estrela-do-mar', 'SALGADA', 1);
insert into aquario (descricao, tipo_agua, fk_empresa) values ('Aquário de Peixe-dourado', 'DOCE', 2);
