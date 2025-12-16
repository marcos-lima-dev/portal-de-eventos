"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Se der erro, rode: npx shadcn@latest add textarea
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Se der erro, rode: npx shadcn@latest add select
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";

// 1. Definição do Schema de Validação (Zod)
const formSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  local: z.string().min(3, "O local é obrigatório."),
  // Data precisa ser válida
  data_evento: z.string().refine((val) => val !== "", "Data é obrigatória."), 
  categoria: z.string({ required_error: "Selecione uma categoria." }),
  descricao: z.string().optional(),
});

// Inferir o tipo a partir do schema
type FormValues = z.infer<typeof formSchema>;

export default function NovoEventoPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 2. Configuração do React Hook Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      local: "",
      data_evento: "",
      categoria: "", // Valor inicial vazio para forçar seleção
      descricao: "",
    },
  });

  // 3. Função de Submit
  async function onSubmit(data: FormValues) {
    setIsLoading(true);

    try {
      // Envia para nossa API Mock
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar");
      }

      // Sucesso: Redireciona para a Home
      router.push("/");
      router.refresh(); // Força o Next a atualizar a lista na home
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao salvar o evento.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="container mx-auto py-10 px-4 max-w-2xl">
      <div className="mb-6">
        <Button variant="ghost" asChild className="pl-0">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Cadastrar Novo Evento</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Campo Nome */}
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Evento</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Feira de Livros..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Campo Categoria (Select do Shadcn) */}
                <FormField
                  control={form.control}
                  name="categoria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Música">Música</SelectItem>
                          <SelectItem value="Teatro">Teatro</SelectItem>
                          <SelectItem value="Exposição">Exposição</SelectItem>
                          <SelectItem value="Cinema">Cinema</SelectItem>
                          <SelectItem value="Infantil">Infantil</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Campo Data */}
                <FormField
                  control={form.control}
                  name="data_evento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data e Hora</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Campo Local */}
              <FormField
                control={form.control}
                name="local"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Local</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Teatro Municipal" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo Descrição */}
              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição (Opcional)</FormLabel>
                    <FormControl>
                      {/* Precisamos do componente Textarea */}
                      <Textarea 
                        placeholder="Detalhes sobre o evento..." 
                        className="resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Cadastrar Evento"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}