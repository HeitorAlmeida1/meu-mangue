-- ============================================================
-- MIGRAÇÃO: adiciona gênero musical e nota de impacto
-- Execute com um usuário administrador (root), pois cria e
-- altera tabelas. O usuário da aplicação (insert_mangue) só
-- tem permissão de SELECT/INSERT/UPDATE/DELETE.
-- ============================================================

USE meu_mangue;

-- ---------- 1. Tabela de gêneros ----------

CREATE TABLE genero (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(30) NOT NULL
) AUTO_INCREMENT = 1;

INSERT INTO genero (nome) VALUES
('Manguebeat'), ('MPB'), ('Rock'), ('Pop'), ('Axé'),
('Samba'), ('Pagode'), ('Forró'), ('Sertanejo'), ('Rap'),
('R&B'), ('Funk'), ('Reggae'), ('Indie'), ('Eletrônica'),
('Jazz'), ('Blues'), ('Soul'), ('Infantil'), ('Gospel'),
('Bossa Nova'), ('Punk'), ('Metal'), ('Clássica');

-- ---------- 2. Novas colunas em historia ----------

-- As colunas entram aceitando NULL porque a tabela já tem registros.
-- Elas são preenchidas no passo 3 e só então viram NOT NULL (passo 4).

ALTER TABLE historia ADD COLUMN fk_genero INT;
ALTER TABLE historia ADD COLUMN impacto INT;

-- ---------- 3. Preencher as histórias já existentes ----------

-- Gêneros inferidos a partir do artista de cada música.
UPDATE historia SET fk_genero = (SELECT id FROM genero WHERE nome = 'Axé')        WHERE artista = 'Ivete Sangalo';
UPDATE historia SET fk_genero = (SELECT id FROM genero WHERE nome = 'Manguebeat') WHERE artista = 'Chico Science';
UPDATE historia SET fk_genero = (SELECT id FROM genero WHERE nome = 'R&B')        WHERE artista = 'Jorja Smith';
UPDATE historia SET fk_genero = (SELECT id FROM genero WHERE nome = 'Rock')       WHERE artista = 'Rita Lee';
UPDATE historia SET fk_genero = (SELECT id FROM genero WHERE nome = 'Indie')      WHERE artista = 'Yot Club';
UPDATE historia SET fk_genero = (SELECT id FROM genero WHERE nome = 'Infantil')   WHERE artista = 'Palavra Cantada';

-- Qualquer história sem gênero definido acima (ex: a de teste) recebe MPB.
UPDATE historia SET fk_genero = (SELECT id FROM genero WHERE nome = 'MPB') WHERE fk_genero IS NULL;

-- Impacto neutro (3) nas histórias existentes — ajuste depois conforme o que
-- cada música significa pra você.
UPDATE historia SET impacto = 3 WHERE impacto IS NULL;

-- ---------- 4. Tornar as colunas obrigatórias ----------

ALTER TABLE historia MODIFY COLUMN fk_genero INT NOT NULL;
ALTER TABLE historia MODIFY COLUMN impacto INT NOT NULL;

ALTER TABLE historia ADD FOREIGN KEY (fk_genero) REFERENCES genero(id);

-- ---------- 5. Conferência ----------

SELECT h.id, h.nome_musica, h.artista, g.nome AS genero, h.impacto
FROM historia h
JOIN genero g ON h.fk_genero = g.id
ORDER BY h.id;
