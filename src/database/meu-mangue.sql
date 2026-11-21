-- ============================================================
-- Meu Mangue - script de criação do banco
--
-- Execute este arquivo em um usuário com permissão de criação
-- (root, por exemplo). O usuário usado pela aplicação precisa
-- apenas de SELECT, INSERT, UPDATE e DELETE neste banco.
-- ============================================================

CREATE DATABASE meu_mangue;

USE meu_mangue;

-- ------------------------------------------------------------
-- Tabelas
-- ------------------------------------------------------------

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

CREATE TABLE genero (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(30) NOT NULL
) AUTO_INCREMENT = 1;

CREATE TABLE historia (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome_musica VARCHAR(100) NOT NULL,
	artista VARCHAR(100) NOT NULL,
	data_musica DATE,
	trecho VARCHAR(140) NOT NULL,
	texto_completo TEXT NOT NULL,
	data_publicacao DATETIME DEFAULT CURRENT_TIMESTAMP,
	impacto INT NOT NULL,
	fk_fase_vida INT NOT NULL,
	fk_genero INT NOT NULL,
	fk_usuario INT NOT NULL,
	FOREIGN KEY (fk_fase_vida) REFERENCES fase_vida(id),
	FOREIGN KEY (fk_genero) REFERENCES genero(id),
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
) AUTO_INCREMENT = 1;

-- ------------------------------------------------------------
-- Dados fixos (necessários para a aplicação funcionar)
-- ------------------------------------------------------------

INSERT INTO fase_vida (nome, descricao) VALUES
('Infância', 'Músicas que marcaram a infância'),
('Adolescência', 'Músicas que marcaram a adolescência'),
('Hoje', 'Músicas que marcam o momento atual');

INSERT INTO genero (nome) VALUES
('Manguebeat'), ('MPB'), ('Rock'), ('Pop'), ('Axé'),
('Samba'), ('Pagode'), ('Forró'), ('Sertanejo'), ('Rap'),
('R&B'), ('Funk'), ('Reggae'), ('Indie'), ('Eletrônica'),
('Jazz'), ('Blues'), ('Soul'), ('Infantil'), ('Gospel'),
('Bossa Nova'), ('Punk'), ('Metal'), ('Clássica');

-- ------------------------------------------------------------
-- Consultas usadas pela aplicação (referência)
-- ------------------------------------------------------------

-- Listagem de histórias (telas de histórias e home)
SELECT h.id, h.nome_musica, h.artista, h.data_musica, h.trecho, h.impacto,
       f.nome AS fase, g.nome AS genero, u.nome AS autor
FROM historia h
JOIN fase_vida f ON h.fk_fase_vida = f.id
JOIN genero g ON h.fk_genero = g.id
JOIN usuario u ON h.fk_usuario = u.id
ORDER BY h.data_publicacao DESC;

-- Dashboard: histórias por fase da vida
SELECT f.nome AS fase, COUNT(h.id) AS total
FROM fase_vida f
LEFT JOIN historia h ON h.fk_fase_vida = f.id AND h.fk_usuario = 1
GROUP BY f.id, f.nome
ORDER BY f.id;

-- Dashboard: gêneros por fase da vida
SELECT g.nome AS genero, f.nome AS fase, COUNT(h.id) AS total
FROM historia h
JOIN genero g ON h.fk_genero = g.id
JOIN fase_vida f ON h.fk_fase_vida = f.id
WHERE h.fk_usuario = 1
GROUP BY g.nome, f.nome, f.id
ORDER BY f.id, total DESC;

-- Dashboard: músicas por década
SELECT CONCAT(FLOOR(YEAR(data_musica) / 10) * 10, 's') AS decada, COUNT(id) AS total
FROM historia
WHERE fk_usuario = 1
GROUP BY decada
ORDER BY decada;

-- Dashboard: impacto médio por fase da vida
SELECT f.nome AS fase, ROUND(AVG(h.impacto), 1) AS media
FROM historia h
JOIN fase_vida f ON h.fk_fase_vida = f.id
WHERE h.fk_usuario = 1
GROUP BY f.id, f.nome
ORDER BY f.id;