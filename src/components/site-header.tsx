"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { UserCircle, LogOut } from "lucide-react";

export function SiteHeader() {
  // Nota: Removemos o 'login' daqui, pois o login agora é feito na página /login
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-14 items-center justify-between px-4 mx-auto">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2 font-bold text-xl">
            🏛️ Portal Cultura
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground hidden md:inline-block">
                Olá, {user?.name}
              </span>
              <Button onClick={logout} variant="destructive" size="sm">
                <LogOut className="mr-2 h-4 w-4" /> Sair
              </Button>
            </div>
          ) : (
            /* AQUI ESTÁ A MUDANÇA:
               Usamos 'asChild' para transformar o botão visualmente em um Link do Next.js
               Isso leva o usuário para a tela com formulário de validação.
            */
            <Button asChild variant="default" size="sm">
              <Link href="/login">
                <UserCircle className="mr-2 h-4 w-4" /> Login Administrativo
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}