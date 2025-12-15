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
import { CalendarIcon, MapPinIcon } from "lucide-react"; // Instale lucide-react se der erro

// Função para buscar dados (Server Side Fetching)
async function getEventos(): Promise<Evento[]> {
  // Nota: Em ambiente dev, usamos URL absoluta.
  // Em produção real, a lógica seria diferente, mas para o teste:
  const res = await fetch("http://localhost:3000/api/events", {
    cache: "no-store", // Garante que sempre pegue dados novos (SSR dinâmico)
  });

  if (!res.ok) {
    throw new Error("Falha ao buscar eventos");
  }

  return res.json();
}

export default async function Home() {
  const eventos = await getEventos();

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Eventos Culturais Rio
          </h1>
          <p className="text-muted-foreground mt-1">
            Descubra o que está acontecendo na cidade maravilhosa.
          </p>
        </div>
        <Button asChild>
          <Link href="/novo">Cadastrar Evento</Link>
        </Button>
      </div>

      {/* Grid de Eventos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventos.map((evento) => (
          <Card key={evento.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant="secondary" className="mb-2">
                  {evento.categoria}
                </Badge>
                <span className="text-xs text-muted-foreground">
                    {/* Formatação simples de data */}
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
    </main>
  );
}