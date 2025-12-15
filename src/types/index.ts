// Define o formato de um Evento na nossa aplicação
export interface Evento {
  id: number;
  nome: string;
  descricao: string;
  local: string;
  data_evento: string; // Vem como string ISO do JSON
  categoria: string;
  imagem_url?: string; // Opcional
}

// Define o formato para criar um novo evento (omitimos ID e Data de criação)
export interface CriarEventoDTO {
  nome: string;
  descricao: string;
  local: string;
  data_evento: string;
  categoria: string;
}