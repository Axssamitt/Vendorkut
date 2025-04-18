import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PendingRegistrationPage() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-8">
      <Card className="mx-auto max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Cadastro Recebido!</CardTitle>
          <CardDescription className="text-center">
            Seu cadastro foi recebido e está em análise pela nossa equipe administrativa.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            Você receberá um e-mail assim que seu cadastro for aprovado. Este processo geralmente leva até 24 horas
            úteis.
          </p>
          <p className="text-sm text-muted-foreground">
            Caso tenha alguma dúvida, entre em contato com nosso suporte através do e-mail suporte@vendorkut.com
          </p>
        </CardContent>
        <CardFooter>
          <Link href="/" className="w-full">
            <Button className="w-full">Voltar para a página inicial</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
