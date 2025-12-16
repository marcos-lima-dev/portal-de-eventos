import { Evento } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Função para buscar UM evento específico
async function getEvento(id: string): Promise<Evento | undefined> {
  // TRUQUE DO MOCK:
  // Como nossa API atual (route.ts) só retorna TUDO (/api/events),
  // vamos buscar tudo e filtrar aqui no front-end por enquanto.
  // Num app real, o endpoint seria: fetch(`http://.../api/events/${id}`)
  
  const res = await fetch("http://localhost:3000/api/events", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar eventos");
  }

  const eventos: Evento[] = await res.json();
  
  // Encontra o evento que tem o ID igual ao da URL
  return eventos.find((evt) => evt.id.toString() === id);
}

// Tipagem correta para Next.js 15 (params é uma Promise)
interface Props {
  params: Promise<{ id: string }>;
}

export default async function DetalhesEvento({ params }: Props) {
  // 1. Desembrulha os parametros da URL (Next 15)
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // 2. Busca os dados
  const evento = await getEvento(id);

  // 3. Se não achar, joga para a página 404 padrão do Next
  if (!evento) {
    notFound();
  }

  return (
    <main className="container mx-auto py-10 px-4 max-w-3xl">
      {/* Botão Voltar */}
      <div className="mb-6">
        <Button variant="ghost" asChild className="pl-0 hover:pl-2 transition-all">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para a lista
          </Link>
        </Button>
      </div>

      {/* Card Principal de Detalhes */}
      <Card className="overflow-hidden">
        {/* Simulando uma imagem de capa (opcional no desafio, mas fica bonito) */}
        <div className="h-48 bg-zinc-100 flex items-center justify-center border-b">
          <span className="text-zinc-400 font-medium">Imagem do Evento</span>
        </div>

        <CardHeader>
          <div className="flex justify-between items-start mb-4">
            <Badge className="text-sm px-3 py-1">{evento.categoria}</Badge>
            <span className="text-sm text-muted-foreground">ID: {evento.id}</span>
          </div>
          <CardTitle className="text-4xl font-extrabold text-zinc-900">
            {evento.nome}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Informações Chave */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center p-3 bg-zinc-50 rounded-lg border">
              <CalendarIcon className="h-5 w-5 text-zinc-500 mr-3" />
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold">Data e Hora</p>
                <p className="font-medium">
                  {new Date(evento.data_evento).toLocaleString("pt-BR", {
                    dateStyle: "long",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-zinc-50 rounded-lg border">
              <MapPinIcon className="h-5 w-5 text-zinc-500 mr-3" />
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold">Local</p>
                <p className="font-medium">{evento.local}</p>
              </div>
            </div>
          </div>

          {/* Descrição Completa */}
          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold mb-2">Sobre o evento</h3>
            <p className="text-zinc-700 leading-relaxed whitespace-pre-line">
              {evento.descricao}
            </p>
          </div>
          
          <div className="pt-4 flex gap-4">
             <Button className="w-full md:w-auto">Confirmar Presença</Button>
             <Button variant="outline" className="w-full md:w-auto">Compartilhar</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}