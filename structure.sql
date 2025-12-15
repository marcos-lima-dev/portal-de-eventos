-- Criação do Banco de Dados (simbólico)
CREATE DATABASE IF NOT EXISTS portal_cultura_rio;
USE portal_cultura_rio;

-- Tabela de Eventos
CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único
    nome VARCHAR(255) NOT NULL,        -- Nome do evento (obrigatório)
    descricao TEXT,                    -- Descrição mais longa
    local VARCHAR(255) NOT NULL,       -- Local do evento
    data_evento DATETIME NOT NULL,     -- Data e Hora
    categoria VARCHAR(50) NOT NULL,    -- Ex: Música, Teatro
    imagem_url VARCHAR(255),           -- URL opcional para imagem
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Data de criação do registro
);

-- Inserção de dados de exemplo (Seed) para mostrar que você sabe popular o banco
INSERT INTO eventos (nome, descricao, local, data_evento, categoria) VALUES 
('Show de Jazz na Praça', 'Uma noite de jazz ao ar livre.', 'Praça Mauá', '2023-12-25 18:00:00', 'Música'),
('Exposição de Arte Moderna', 'Obras de artistas locais.', 'MAM Rio', '2023-12-28 10:00:00', 'Exposição');