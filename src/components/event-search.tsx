"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export function EventSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");

  // Atualiza a URL quando o usuário para de digitar por 500ms
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Se tiver valor, adiciona ?q=valor, senão remove o parametro
      if (searchValue) {
        router.push(`/?q=${encodeURIComponent(searchValue)}`);
      } else {
        router.push("/");
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchValue, router]);

  return (
    <div className="relative w-full md:w-[300px]">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Buscar por nome ou categoria..."
        className="pl-8"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}