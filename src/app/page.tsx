import { Evento } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPinIcon } from "lucide-react";
import { EventSearch } from "@/components/event-search"; // <--- Importamos aqui

async function getEventos(): Promise<Evento[]> {
  const res = await fetch("http://localhost:3000/api/events", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Falha ao buscar eventos");
  return res.json();
}

// Next 15: searchParams é uma Promise
type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function Home({ searchParams }: Props) {
  // 1. Resolvemos os parametros
  const params = await searchParams;
  const query = params.q?.toLowerCase() || "";

  // 2. Buscamos TODOS os eventos
  const eventos = await getEventos();

  // 3. Filtramos em memória (Case insensitive)
  const eventosFiltrados = eventos.filter((evento) => {
    if (!query) return true; // Se não tem busca, mostra tudo
    return (
      evento.nome.toLowerCase().includes(query) ||
      evento.categoria.toLowerCase().includes(query)
    );
  });

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Eventos Culturais Rio
          </h1>
          <p className="text-muted-foreground mt-1">
            Descubra o que está acontecendo na cidade maravilhosa.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          {/* Adicionamos a Busca aqui */}
          <EventSearch />
          
          <Button asChild>
            <Link href="/novo">Cadastrar Evento</Link>
          </Button>
        </div>
      </div>

      {eventosFiltrados.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          Nenhum evento encontrado para "{query}".
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventosFiltrados.map((evento) => (
            <Card key={evento.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="mb-2">
                    {evento.categoria}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(evento.data_evento).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <CardTitle className="text-xl">{evento.nome}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {evento.descricao}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center text-sm text-zinc-600 gap-2">
                  <MapPinIcon className="w-4 h-4" />
                  <span>{evento.local}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/eventos/${evento.id}`}>Ver Detalhes</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}