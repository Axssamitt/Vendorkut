"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, ShoppingBag, UserCheck, ShieldCheck, Settings, LogOut, Package2 } from "lucide-react"

export default function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="font-bold text-xl bg-clip-text text-transparent orkut-gradient">Vendorkut Admin</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link
              href="/admin"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive("/admin")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/usuarios"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive("/admin/usuarios")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Users className="h-4 w-4" />
              Usuários
            </Link>
            <Link
              href="/admin/usuarios/pendentes"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive("/admin/usuarios/pendentes")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <UserCheck className="h-4 w-4" />
              Aprovações Pendentes
            </Link>
            <Link
              href="/admin/produtos"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive("/admin/produtos")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              Produtos
            </Link>
            <Link
              href="/admin/produtos/pendentes"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive("/admin/produtos/pendentes")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              Produtos Pendentes
            </Link>
            <Link
              href="/admin/permissoes"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive("/admin/permissoes")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              Permissões
            </Link>
            <Link
              href="/admin/configuracoes"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive("/admin/configuracoes")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Settings className="h-4 w-4" />
              Configurações
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Link href="/">
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground">
              <LogOut className="h-4 w-4" />
              Sair do Admin
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
