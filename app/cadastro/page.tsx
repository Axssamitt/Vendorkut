"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import db from "@/lib/db-config"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [documentType, setDocumentType] = useState<"cpf" | "cnpj">("cpf")
  const [document, setDocument] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const formatDocument = (value: string) => {
    if (!value) return ""

    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, "")

    if (documentType === "cpf") {
      // Limita a 11 dígitos para CPF
      const cpf = numbers.slice(0, 11)

      // Formata como CPF: 000.000.000-00
      if (cpf.length <= 3) return cpf
      if (cpf.length <= 6) return `${cpf.slice(0, 3)}.${cpf.slice(3)}`
      if (cpf.length <= 9) return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`
      return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`
    } else {
      // Limita a 14 dígitos para CNPJ
      const cnpj = numbers.slice(0, 14)

      // Formata como CNPJ: 00.000.000/0000-00
      if (cnpj.length <= 2) return cnpj
      if (cnpj.length <= 5) return `${cnpj.slice(0, 2)}.${cnpj.slice(2)}`
      if (cnpj.length <= 8) return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5)}`
      if (cnpj.length <= 12) return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8)}`
      return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12)}`
    }
  }

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatDocument(e.target.value)
    setDocument(formattedValue)
  }

  const validateCPF = (cpf: string) => {
    // Remove non-numeric characters
    const cleanCPF = cpf.replace(/\D/g, "")

    // Check if it has 11 digits
    if (cleanCPF.length !== 11) return false

    // Check if all digits are the same
    if (/^(\d)\1+$/.test(cleanCPF)) return false

    // Validate first check digit
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += Number.parseInt(cleanCPF.charAt(i)) * (10 - i)
    }
    let remainder = 11 - (sum % 11)
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== Number.parseInt(cleanCPF.charAt(9))) return false

    // Validate second check digit
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += Number.parseInt(cleanCPF.charAt(i)) * (11 - i)
    }
    remainder = 11 - (sum % 11)
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== Number.parseInt(cleanCPF.charAt(10))) return false

    return true
  }

  const validateCNPJ = (cnpj: string) => {
    // Remove non-numeric characters
    const cleanCNPJ = cnpj.replace(/\D/g, "")

    // Check if it has 14 digits
    if (cleanCNPJ.length !== 14) return false

    // Check if all digits are the same
    if (/^(\d)\1+$/.test(cleanCNPJ)) return false

    // Validate first check digit
    let size = cleanCNPJ.length - 2
    let numbers = cleanCNPJ.substring(0, size)
    const digits = cleanCNPJ.substring(size)
    let sum = 0
    let pos = size - 7

    for (let i = size; i >= 1; i--) {
      sum += Number.parseInt(numbers.charAt(size - i)) * pos--
      if (pos < 2) pos = 9
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    if (result !== Number.parseInt(digits.charAt(0))) return false

    // Validate second check digit
    size = size + 1
    numbers = cleanCNPJ.substring(0, size)
    sum = 0
    pos = size - 7

    for (let i = size; i >= 1; i--) {
      sum += Number.parseInt(numbers.charAt(size - i)) * pos--
      if (pos < 2) pos = 9
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    if (result !== Number.parseInt(digits.charAt(1))) return false

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Validate password match
      if (password !== confirmPassword) {
        throw new Error("As senhas não coincidem")
      }

      // Validate document
      const cleanDocument = document.replace(/\D/g, "")
      if (documentType === "cpf" && !validateCPF(cleanDocument)) {
        throw new Error("CPF inválido")
      } else if (documentType === "cnpj" && !validateCNPJ(cleanDocument)) {
        throw new Error("CNPJ inválido")
      }

      // Check if email already exists
      const existingUserByEmail = await db.findUserByEmail(email)
      if (existingUserByEmail) {
        throw new Error("Este e-mail já está em uso")
      }

      // Check if document already exists
      const existingUserByDocument = await db.findUserByDocument(document)
      if (existingUserByDocument) {
        throw new Error(`Este ${documentType.toUpperCase()} já está cadastrado`)
      }

      // Create user
      await db.createUser({
        id: "", // Will be generated by the database
        firstName,
        lastName,
        email,
        password, // In a real app, this would be hashed
        document,
        documentType,
        role: "user",
        permissions: ["view_products"],
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })

      toast({
        title: "Cadastro realizado com sucesso",
        description: "Seu cadastro foi enviado para aprovação.",
        variant: "default",
      })

      router.push("/cadastro/pendente")
    } catch (error) {
      console.error("Registration error:", error)
      setError(error instanceof Error ? error.message : "Erro ao criar conta")
      toast({
        title: "Erro no cadastro",
        description: error instanceof Error ? error.message : "Erro ao criar conta",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-8">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Criar uma conta</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para se cadastrar no Vendorkut. Seu cadastro será analisado pela nossa equipe.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 text-sm bg-red-50 text-red-600 rounded-md">{error}</div>}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nome</Label>
                <Input id="firstName" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Sobrenome</Label>
                <Input id="lastName" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-4 mb-1">
                <Label>Tipo de Documento</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="cpf"
                    name="documentType"
                    checked={documentType === "cpf"}
                    onChange={() => setDocumentType("cpf")}
                  />
                  <Label htmlFor="cpf" className="font-normal">
                    CPF
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="cnpj"
                    name="documentType"
                    checked={documentType === "cnpj"}
                    onChange={() => setDocumentType("cnpj")}
                  />
                  <Label htmlFor="cnpj" className="font-normal">
                    CNPJ
                  </Label>
                </div>
              </div>
              <Label htmlFor="document">{documentType === "cpf" ? "CPF" : "CNPJ"}</Label>
              <Input
                id="document"
                value={document}
                onChange={handleDocumentChange}
                placeholder={documentType === "cpf" ? "000.000.000-00" : "00.000.000/0000-00"}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" className="rounded border-gray-300" required />
              <Label htmlFor="terms" className="text-sm font-normal">
                Eu concordo com os{" "}
                <Link href="/termos" className="text-primary hover:underline">
                  Termos de Serviço
                </Link>{" "}
                e{" "}
                <Link href="/privacidade" className="text-primary hover:underline">
                  Política de Privacidade
                </Link>
              </Label>
            </div>
            <Button type="submit" className="w-full orkut-button" disabled={isLoading}>
              {isLoading ? "Criando conta..." : "Criar conta"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">Ou continue com</div>
          <div className="flex gap-2 mt-2">
            <Button variant="outline" className="w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="mr-2"
                viewBox="0 0 16 16"
              >
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="mr-2"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              GitHub
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Faça login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
