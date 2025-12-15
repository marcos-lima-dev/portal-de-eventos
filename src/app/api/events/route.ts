import { NextResponse } from 'next/server';

// 1. Banco de Dados em Memória (Simulação)
// Usamos 'let' para permitir adicionar itens.
// Em um app real, isso viria de um DB. Nota: Ao reiniciar o server, isso reseta.
let events = [
  {
    id: 1,
    nome: "Show de Jazz na Praça",
    descricao: "Uma noite de jazz ao ar livre com bandas locais.",
    local: "Praça Mauá",
    data_evento: "2023-12-25T18:00:00",
    categoria: "Música"
  },
  {
    id: 2,
    nome: "Exposição Arte Moderna",
    descricao: "Obras de artistas cariocas contemporâneos.",
    local: "MAM Rio",
    data_evento: "2023-12-28T10:00:00",
    categoria: "Exposição"
  }
];

// 2. Método GET: Retorna todos os eventos
export async function GET() {
  return NextResponse.json(events);
}

// 3. Método POST: Cria um novo evento
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Simples validação de campos obrigatórios
    if (!body.nome || !body.local || !body.data_evento || !body.categoria) {
      return NextResponse.json(
        { message: 'Campos obrigatórios faltando' },
        { status: 400 }
      );
    }

    const newEvent = {
      id: events.length + 1, // Auto-incremento simples
      nome: body.nome,
      descricao: body.descricao || "",
      local: body.local,
      data_evento: body.data_evento,
      categoria: body.categoria,
    };

    events.push(newEvent);

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao processar requisição' },
      { status: 500 }
    );
  }
}