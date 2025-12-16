import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Caminho absoluto para o arquivo JSON
const dbPath = path.join(process.cwd(), 'src/app/api/events/db.json');

// Função auxiliar para LER o arquivo
function getEventsDB() {
  const fileData = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(fileData);
}

// Função auxiliar para ESCREVER no arquivo
function saveEventsDB(data: any[]) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// GET: Lê do arquivo
export async function GET() {
  try {
    const events = getEventsDB();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao ler dados' }, { status: 500 });
  }
}

// POST: Lê, Adiciona e Grava no arquivo
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validação simples
    if (!body.nome || !body.local || !body.data_evento || !body.categoria) {
      return NextResponse.json(
        { message: 'Campos obrigatórios faltando' },
        { status: 400 }
      );
    }

    // 1. Pega os dados atuais
    const events = getEventsDB();

    // 2. Cria o novo evento
    const newEvent = {
      id: events.length > 0 ? events[events.length - 1].id + 1 : 1, // Auto-incremento mais seguro
      nome: body.nome,
      descricao: body.descricao || "",
      local: body.local,
      data_evento: body.data_evento,
      categoria: body.categoria,
    };

    // 3. Adiciona ao array e SALVA no arquivo
    events.push(newEvent);
    saveEventsDB(events);

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Erro ao processar requisição' },
      { status: 500 }
    );
  }
}