"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteButton({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Tem certeza que deseja excluir este evento?")) return;

    setLoading(true);
    try {
      await fetch(`/api/events?id=${id}`, { method: "DELETE" });
      router.refresh(); // Atualiza a lista na hora
    } catch (error) {
      alert("Erro ao excluir");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button 
      variant="destructive" 
      size="icon" 
      onClick={handleDelete} 
      disabled={loading}
      title="Excluir Evento"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}