import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start md:gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-xl bg-clip-text text-transparent orkut-gradient">Vendorkut</span>
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; 2024 Vendorkut. Todos os direitos reservados.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-6">
          <nav className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
            <Link href="/sobre" className="text-sm font-medium hover:text-primary">
              Sobre
            </Link>
            <Link href="/termos" className="text-sm font-medium hover:text-primary">
              Termos
            </Link>
            <Link href="/privacidade" className="text-sm font-medium hover:text-primary">
              Privacidade
            </Link>
            <Link href="/contato" className="text-sm font-medium hover:text-primary">
              Contato
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
