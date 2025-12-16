import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define o caminho do arquivo de forma segura
const dbPath = path.join(process.cwd(), 'src', 'app', 'api', 'events', 'db.json');

// --- FUNÇÕES AUXILIARES (AJUDANTES) ---

// 1. Inicia o Banco de Dados se ele não existir ou der erro
function initDB() {
  const initialData = [
    {
      id: 1,
      nome: "Evento Exemplo (Auto-gerado)",
      descricao: "Este evento apareceu porque o banco estava vazio.",
      local: "Sistema",
      data_evento: new Date().toISOString(),
      categoria: "Sistema"
    }
  ];
  
  // Garante que a pasta existe
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Cria o arquivo físico
  fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
  return initialData;
}

// 2. Lê os dados com segurança (Try/Catch)
function getEventsDB() {
  try {
    // Se arquivo não existe, cria
    if (!fs.existsSync(dbPath)) {
      return initDB();
    }

    const fileData = fs.readFileSync(dbPath, 'utf8');
    
    // Se arquivo existe mas está vazio (bug que você teve), recria
    if (!fileData.trim()) {
      return initDB();
    }

    return JSON.parse(fileData);
  } catch (error) {
    console.error("Erro ao ler DB, resetando...", error);
    return initDB(); 
  }
}

// 3. Salva os dados no arquivo
function saveEventsDB(data: any[]) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Erro ao salvar:", error);
  }
}

// --- ROTAS DA API ---

// GET: Listar
export async function GET() {
  const events = getEventsDB();
  return NextResponse.json(events);
}

// POST: Cadastrar
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.nome || !body.local || !body.data_evento || !body.categoria) {
      return NextResponse.json(
        { message: 'Campos obrigatórios faltando' },
        { status: 400 }
      );
    }

    const events = getEventsDB();

    const newEvent = {
      // Pega o maior ID existente e soma 1 (mais seguro que length)
      id: events.length > 0 ? Math.max(...events.map((e: any) => e.id)) + 1 : 1,
      nome: body.nome,
      descricao: body.descricao || "",
      local: body.local,
      data_evento: body.data_evento,
      categoria: body.categoria,
    };

    events.push(newEvent);
    saveEventsDB(events);

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro interno no servidor' },
      { status: 500 }
    );
  }
}

// DELETE: Excluir (Novidade!)
export async function DELETE(request: Request) {
  try {
    // Pega o ID da URL (ex: /api/events?id=1)
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID necessário' }, { status: 400 });
    }

    let events = getEventsDB();
    
    // Filtra removendo o evento com aquele ID
    const newEvents = events.filter((evt: any) => evt.id.toString() !== id);

    // Se o tamanho continuou igual, é porque o ID não existia
    if (newEvents.length === events.length) {
       return NextResponse.json({ message: 'Evento não encontrado' }, { status: 404 });
    }

    saveEventsDB(newEvents); // Salva a lista atualizada

    return NextResponse.json({ message: 'Deletado com sucesso' });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao deletar' }, { status: 500 });
  }
}