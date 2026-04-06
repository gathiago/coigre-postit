CREATE DATABASE IF NOT EXISTS postit_coigre
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE postit_coigre;

CREATE TABLE IF NOT EXISTS postits (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  session_id  VARCHAR(64)   NOT NULL,
  cor         VARCHAR(20)   NOT NULL DEFAULT 'amarelo',
  fonte       VARCHAR(30)   NOT NULL DEFAULT 'caveat',
  tamanho     INT           NOT NULL DEFAULT 18,
  texto       TEXT          NOT NULL,
  posicao     INT           NOT NULL DEFAULT 0,
  grupo_id    VARCHAR(64)   NOT NULL,
  created_at  DATETIME      DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_session  ON postits (session_id);
CREATE INDEX idx_grupo    ON postits (grupo_id);
CREATE INDEX idx_created  ON postits (created_at DESC);
