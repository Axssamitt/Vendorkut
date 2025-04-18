"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle, Search, ShoppingBag, AlertCircle, Eye } from "lucide-react"
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
const pendingProducts = [
  {
    id: "1",
    name: "Smartphone Galaxy X20",
    price: "R$ 1.999,99",
    seller: { name: "TechStore", id: "seller1" },
    category: "Eletrônicos",
    description: "O mais novo smartphone com câmera de alta resolução e bateria de longa duração.",
    image: "/placeholder.svg?height=300&width=300",
    date: "01/05/2023",
    status: "pending",
  },
  {
    id: "2",
    name: "Notebook Ultra Slim",
    price: "R$ 4.500,00",
    seller: { name: "InfoShop", id: "seller2" },
    category: "Eletrônicos",
    description: "Notebook leve e potente para trabalho e entretenimento.",
    image: "/placeholder.svg?height=300&width=300",
    date: "02/05/2023",
    status: "pending",
  },
  {
    id: "3",
    name: "Fone de Ouvido Bluetooth Pro",
    price: "R$ 350,00",
    seller: { name: "AudioTech", id: "seller3" },
    category: "Eletrônicos",
    description: "Fone sem fio com cancelamento de ruído e bateria de longa duração.",
    image: "/placeholder.svg?height=300&width=300",
    date: "03/05/2023",
    status: "pending",
  },
  {
    id: "4",
    name: "Tênis Esportivo Runner",
    price: "R$ 299,90",
    seller: { name: "SportFit", id: "seller4" },
    category: "Esportes",
    description: "Tênis leve e confortável, ideal para corridas e atividades físicas.",
    image: "/placeholder.svg?height=300&width=300",
    date: "04/05/2023",
    status: "pending",
  },
  {
    id: "5",
    name: "Cafeteira Elétrica Premium",
    price: "R$ 189,90",
    seller: { name: "CasaModerna", id: "seller5" },
    category: "Casa",
    description: "Prepare café de qualidade com esta cafeteira de design moderno.",
    image: "/placeholder.svg?height=300&width=300",
    date: "05/05/2023",
    status: "pending",
  },
]

export default function PendingProductsPage() {
  const [products, setProducts] = useState(pendingProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<(typeof pendingProducts)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState("")

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleApprove = (productId: string) => {
    // Em um cenário real, você enviaria uma requisição para a API
    setProducts(products.map((product) => (product.id === productId ? { ...product, status: "approved" } : product)))

    // Fechar o diálogo se estiver aberto
    setIsDialogOpen(false)
  }

  const handleReject = (productId: string) => {
    // Em um cenário real, você enviaria uma requisição para a API com o motivo da rejeição
    setProducts(products.map((product) => (product.id === productId ? { ...product, status: "rejected" } : product)))

    // Resetar e fechar o diálogo
    setRejectReason("")
    setRejectDialogOpen(false)
  }

  const openProductDetails = (product: (typeof pendingProducts)[0]) => {
    setSelectedProduct(product)
    setIsDialogOpen(true)
  }

  const openRejectDialog = (product: (typeof pendingProducts)[0]) => {
    setSelectedProduct(product)
    setRejectDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Produtos Pendentes</h1>
        <p className="text-muted-foreground">Gerencie os produtos que aguardam aprovação para venda.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Aprovações Pendentes
          </CardTitle>
          <CardDescription>Revise e aprove ou rejeite os produtos submetidos pelos vendedores.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, vendedor ou categoria..."
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
                  <TableHead>Produto</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Vendedor</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      Nenhum produto pendente encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.seller.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.date}</TableCell>
                      <TableCell>
                        {product.status === "pending" ? (
                          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            Pendente
                          </span>
                        ) : product.status === "approved" ? (
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
                            onClick={() => openProductDetails(product)}
                            disabled={product.status !== "pending"}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Ver detalhes</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-green-600"
                            onClick={() => handleApprove(product.id)}
                            disabled={product.status !== "pending"}
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span className="sr-only">Aprovar</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600"
                            onClick={() => openRejectDialog(product)}
                            disabled={product.status !== "pending"}
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

      {/* Diálogo de detalhes do produto */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes do Produto</DialogTitle>
            <DialogDescription>Informações completas do produto submetido para aprovação.</DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4 py-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative h-40 w-40 mx-auto sm:mx-0">
                  <Image
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold">{selectedProduct.name}</h3>
                    <p className="text-lg font-semibold text-primary">{selectedProduct.price}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="font-medium">Vendedor:</p>
                      <p>{selectedProduct.seller.name}</p>
                    </div>
                    <div>
                      <p className="font-medium">Categoria:</p>
                      <p>{selectedProduct.category}</p>
                    </div>
                    <div>
                      <p className="font-medium">Data de Submissão:</p>
                      <p>{selectedProduct.date}</p>
                    </div>
                    <div>
                      <p className="font-medium">Status:</p>
                      <p>
                        {selectedProduct.status === "pending"
                          ? "Pendente"
                          : selectedProduct.status === "approved"
                            ? "Aprovado"
                            : "Rejeitado"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p className="font-medium">Descrição:</p>
                <p className="text-sm">{selectedProduct.description}</p>
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
                  if (selectedProduct) openRejectDialog(selectedProduct)
                }}
              >
                Rejeitar
              </Button>
              <Button onClick={() => selectedProduct && handleApprove(selectedProduct.id)}>Aprovar</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de rejeição */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rejeitar Produto</DialogTitle>
            <DialogDescription>
              Informe o motivo da rejeição do produto. Esta informação será enviada ao vendedor.
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
              onClick={() => selectedProduct && handleReject(selectedProduct.id)}
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
