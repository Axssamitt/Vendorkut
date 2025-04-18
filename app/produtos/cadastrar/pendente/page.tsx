import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PendingProductPage() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-8">
      <Card className="mx-auto max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Produto Enviado!</CardTitle>
          <CardDescription className="text-center">
            Seu produto foi recebido e está em análise pela nossa equipe administrativa.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            Você receberá uma notificação assim que seu produto for aprovado para venda. Este processo geralmente leva
            até 24 horas úteis.
          </p>
          <p className="text-sm text-muted-foreground">
            Caso tenha alguma dúvida, entre em contato com nosso suporte através do e-mail suporte@vendorkut.com
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Link href="/produtos" className="w-full">
            <Button className="w-full">Ver Catálogo de Produtos</Button>
          </Link>
          <Link href="/produtos/meus-produtos" className="w-full">
            <Button variant="outline" className="w-full">
              Meus Produtos
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
