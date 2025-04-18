"use client"

import Link from "next/link"
import { useState } from "react"
import { Bell, Menu, Search, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <MobileNav />
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-xl bg-clip-text text-transparent orkut-gradient">Vendorkut</span>
          </Link>
          <nav className="hidden md:flex gap-6 ml-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Início
            </Link>
            <Link href="/produtos" className="text-sm font-medium hover:text-primary">
              Produtos
            </Link>
            <Link href="/comunidades" className="text-sm font-medium hover:text-primary">
              Comunidades
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center relative max-w-sm">
          <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar produtos, comunidades..." className="pl-8 w-[300px] bg-muted" />
        </div>

        <div className="flex items-center gap-2">
          <Link href="/carrinho">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
              <span className="sr-only">Carrinho</span>
            </Button>
          </Link>

          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notificações</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.jpg" alt="Usuário" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Maria Joaquina</p>
                      <p className="text-xs leading-none text-muted-foreground">maria@exemplo.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/perfil" className="flex w-full">
                      Meu Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/pedidos" className="flex w-full">
                      Meus Pedidos
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/minhas-comunidades" className="flex w-full">
                      Minhas Comunidades
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/admin" className="flex w-full">
                      Painel Administrativo
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>Sair</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Entrar
                </Button>
              </Link>
              <Link href="/cadastro">
                <Button size="sm" className="bg-primary">
                  Cadastrar
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

function MobileNav() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-7 py-4 border-b">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl bg-clip-text text-transparent orkut-gradient">Vendorkut</span>
        </Link>
      </div>
      <div className="px-4 py-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar..." className="pl-8 w-full bg-muted" />
        </div>
      </div>
      <nav className="grid gap-2 p-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium hover:text-primary py-2">
          Início
        </Link>
        <Link href="/produtos" className="flex items-center gap-2 text-sm font-medium hover:text-primary py-2">
          Produtos
        </Link>
        <Link href="/comunidades" className="flex items-center gap-2 text-sm font-medium hover:text-primary py-2">
          Comunidades
        </Link>
        <Link href="/perfil" className="flex items-center gap-2 text-sm font-medium hover:text-primary py-2">
          Meu Perfil
        </Link>
        <Link href="/pedidos" className="flex items-center gap-2 text-sm font-medium hover:text-primary py-2">
          Meus Pedidos
        </Link>
      </nav>
    </div>
  )
}
