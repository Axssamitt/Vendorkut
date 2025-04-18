"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle, Search, UserCheck, AlertCircle, Eye } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Dados de exemplo
const pendingUsers = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@email.com",
    document: "123.456.789-00",
    documentType: "CPF",
    date: "01/05/2023",
    status: "pending",
  },
  {
    id: "2",
    name: "Maria Oliveira",
    email: "maria@email.com",
    document: "987.654.321-00",
    documentType: "CPF",
    date: "02/05/2023",
    status: "pending",
  },
  {
    id: "3",
    name: "Carlos Santos",
    email: "carlos@email.com",
    document: "111.222.333-44",
    documentType: "CPF",
    date: "03/05/2023",
    status: "pending",
  },
  {
    id: "4",
    name: "Tech Solutions Ltda",
    email: "contato@techsolutions.com",
    document: "12.345.678/0001-90",
    documentType: "CNPJ",
    date: "04/05/2023",
    status: "pending",
  },
  {
    id: "5",
    name: "Ana Pereira",
    email: "ana@email.com",
    document: "555.666.777-88",
    documentType: "CPF",
    date: "05/05/2023",
    status: "pending",
  },
]

export default function PendingUsersPage() {
  const [users, setUsers] = useState(pendingUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<(typeof pendingUsers)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.document.includes(searchTerm),
  )

  const handleApprove = (userId: string) => {
    // Em um cenário real, você enviaria uma requisição para a API
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: "approved" } : user)))

    // Fechar o diálogo se estiver aberto
    setIsDialogOpen(false)
  }

  const handleReject = (userId: string) => {
    // Em um cenário real, você enviaria uma requisição para a API com o motivo da rejeição
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: "rejected" } : user)))

    // Resetar e fechar o diálogo
    setRejectReason("")
    setRejectDialogOpen(false)
  }

  const openUserDetails = (user: (typeof pendingUsers)[0]) => {
    setSelectedUser(user)
    setIsDialogOpen(true)
  }

  const openRejectDialog = (user: (typeof pendingUsers)[0]) => {
    setSelectedUser(user)
    setRejectDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Usuários Pendentes</h1>
        <p className="text-muted-foreground">Gerencie os cadastros de usuários que aguardam aprovação.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Aprovações Pendentes
          </CardTitle>
          <CardDescription>Revise e aprove ou rejeite os cadastros de novos usuários.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, email ou documento..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={() => setSearchTerm("")}>
              Limpar
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Documento</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      Nenhum usuário pendente encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span className="text-xs text-muted-foreground">{user.documentType}:</span> {user.document}
                      </TableCell>
                      <TableCell>{user.date}</TableCell>
                      <TableCell>
                        {user.status === "pending" ? (
                          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            Pendente
                          </span>
                        ) : user.status === "approved" ? (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Aprovado
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-1 h-3 w-3"
                            >
                              <path d="M18 6 6 18" />
                              <path d="m6 6 12 12" />
                            </svg>
                            Rejeitado
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openUserDetails(user)}
                            disabled={user.status !== "pending"}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Ver detalhes</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-green-600"
                            onClick={() => handleApprove(user.id)}
                            disabled={user.status !== "pending"}
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span className="sr-only">Aprovar</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600"
                            onClick={() => openRejectDialog(user)}
                            disabled={user.status !== "pending"}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M18 6 6 18" />
                              <path d="m6 6 12 12" />
                            </svg>
                            <span className="sr-only">Rejeitar</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Diálogo de detalhes do usuário */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Detalhes do Usuário</DialogTitle>
            <DialogDescription>Informações completas do cadastro do usuário.</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Nome:</p>
                  <p>{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email:</p>
                  <p>{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Tipo de Documento:</p>
                  <p>{selectedUser.documentType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Documento:</p>
                  <p>{selectedUser.document}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Data de Cadastro:</p>
                  <p>{selectedUser.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status:</p>
                  <p>
                    {selectedUser.status === "pending"
                      ? "Pendente"
                      : selectedUser.status === "approved"
                        ? "Aprovado"
                        : "Rejeitado"}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Fechar
            </Button>
            <div className="flex gap-2">
              <Button
                variant="destructive"
                onClick={() => {
                  setIsDialogOpen(false)
                  if (selectedUser) openRejectDialog(selectedUser)
                }}
              >
                Rejeitar
              </Button>
              <Button onClick={() => selectedUser && handleApprove(selectedUser.id)}>Aprovar</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de rejeição */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rejeitar Cadastro</DialogTitle>
            <DialogDescription>
              Informe o motivo da rejeição do cadastro. Esta informação será enviada ao usuário.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="reject-reason" className="text-sm font-medium">
                Motivo da Rejeição
              </label>
              <textarea
                id="reject-reason"
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Informe o motivo da rejeição..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedUser && handleReject(selectedUser.id)}
              disabled={!rejectReason.trim()}
            >
              Confirmar Rejeição
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
