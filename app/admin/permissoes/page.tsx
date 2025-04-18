"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ShieldCheck, Check } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dados de exemplo
const users = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@email.com",
    role: "user",
    permissions: ["view_products", "create_orders"],
  },
  {
    id: "2",
    name: "Maria Oliveira",
    email: "maria@email.com",
    role: "seller",
    permissions: ["view_products", "create_products", "create_orders"],
  },
  {
    id: "3",
    name: "Carlos Santos",
    email: "carlos@email.com",
    role: "admin",
    permissions: [
      "view_products",
      "create_products",
      "edit_products",
      "delete_products",
      "create_orders",
      "manage_users",
    ],
  },
  {
    id: "4",
    name: "Ana Pereira",
    email: "ana@email.com",
    role: "moderator",
    permissions: ["view_products", "edit_products", "create_orders", "moderate_comments"],
  },
  {
    id: "5",
    name: "Tech Solutions Ltda",
    email: "contato@techsolutions.com",
    role: "seller",
    permissions: ["view_products", "create_products", "create_orders"],
  },
]

const availableRoles = [
  { id: "user", name: "Usuário" },
  { id: "seller", name: "Vendedor" },
  { id: "moderator", name: "Moderador" },
  { id: "admin", name: "Administrador" },
]

const availablePermissions = [
  { id: "view_products", name: "Visualizar Produtos" },
  { id: "create_products", name: "Criar Produtos" },
  { id: "edit_products", name: "Editar Produtos" },
  { id: "delete_products", name: "Excluir Produtos" },
  { id: "create_orders", name: "Criar Pedidos" },
  { id: "manage_users", name: "Gerenciar Usuários" },
  { id: "moderate_comments", name: "Moderar Comentários" },
  { id: "manage_communities", name: "Gerenciar Comunidades" },
]

export default function PermissionsPage() {
  const [usersList, setUsersList] = useState(users)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const filteredUsers = usersList.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const openEditPermissions = (user: (typeof users)[0]) => {
    setSelectedUser(user)
    setSelectedRole(user.role)
    setSelectedPermissions(user.permissions)
    setIsDialogOpen(true)
  }

  const handleSavePermissions = () => {
    if (!selectedUser) return

    setUsersList(
      usersList.map((user) =>
        user.id === selectedUser.id ? { ...user, role: selectedRole, permissions: selectedPermissions } : user,
      ),
    )

    setIsDialogOpen(false)
  }

  const togglePermission = (permissionId: string) => {
    if (selectedPermissions.includes(permissionId)) {
      setSelectedPermissions(selectedPermissions.filter((id) => id !== permissionId))
    } else {
      setSelectedPermissions([...selectedPermissions, permissionId])
    }
  }

  const getRoleName = (roleId: string) => {
    const role = availableRoles.find((r) => r.id === roleId)
    return role ? role.name : roleId
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Permissões</h1>
        <p className="text-muted-foreground">Defina funções e permissões para os usuários da plataforma.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            Permissões de Usuários
          </CardTitle>
          <CardDescription>Gerencie as funções e permissões de acesso dos usuários.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, email ou função..."
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
                  <TableHead>Função</TableHead>
                  <TableHead>Permissões</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      Nenhum usuário encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          {getRoleName(user.role)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {user.permissions.slice(0, 2).map((permission) => (
                            <span
                              key={permission}
                              className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                            >
                              {availablePermissions.find((p) => p.id === permission)?.name || permission}
                            </span>
                          ))}
                          {user.permissions.length > 2 && (
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                              +{user.permissions.length - 2} mais
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => openEditPermissions(user)}>
                          Editar Permissões
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Diálogo de edição de permissões */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Permissões</DialogTitle>
            <DialogDescription>Defina a função e as permissões para {selectedUser?.name}.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">
                Função
              </label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma função" />
                </SelectTrigger>
                <SelectContent>
                  {availableRoles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Permissões</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {availablePermissions.map((permission) => (
                  <div key={permission.id} className="flex items-center space-x-2">
                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded border ${
                        selectedPermissions.includes(permission.id)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-primary"
                      }`}
                      onClick={() => togglePermission(permission.id)}
                    >
                      {selectedPermissions.includes(permission.id) && <Check className="h-3 w-3" />}
                    </div>
                    <label className="text-sm cursor-pointer" onClick={() => togglePermission(permission.id)}>
                      {permission.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSavePermissions}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
