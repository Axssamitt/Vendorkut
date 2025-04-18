"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"

export default function CreateProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [imagePreview, setImagePreview] = useState<string[]>([])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setImages([...images, ...newFiles])

      // Criar previews
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file))
      setImagePreview([...imagePreview, ...newPreviews])
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)

    const newPreviews = [...imagePreview]
    URL.revokeObjectURL(newPreviews[index])
    newPreviews.splice(index, 1)
    setImagePreview(newPreviews)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulando envio do produto
    setTimeout(() => {
      setIsLoading(false)
      router.push("/produtos/cadastrar/pendente")
    }, 1500)
  }

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Cadastrar Novo Produto</h1>

        <Card>
          <CardHeader>
            <CardTitle>Informações do Produto</CardTitle>
            <CardDescription>
              Preencha os detalhes do produto que você deseja vender. Seu produto será analisado pela nossa equipe antes
              de ser publicado.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do Produto</Label>
                    <Input id="name" placeholder="Ex: Smartphone Galaxy X20" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (R$)</Label>
                    <Input id="price" type="number" step="0.01" min="0" placeholder="Ex: 1999.99" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Quantidade em Estoque</Label>
                    <Input id="stock" type="number" min="1" placeholder="Ex: 10" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eletronicos">Eletrônicos</SelectItem>
                        <SelectItem value="moda">Moda</SelectItem>
                        <SelectItem value="casa">Casa e Decoração</SelectItem>
                        <SelectItem value="esportes">Esportes</SelectItem>
                        <SelectItem value="beleza">Beleza e Saúde</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="condition">Condição</Label>
                    <Select>
                      <SelectTrigger id="condition">
                        <SelectValue placeholder="Selecione a condição" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="novo">Novo</SelectItem>
                        <SelectItem value="usado">Usado</SelectItem>
                        <SelectItem value="recondicionado">Recondicionado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva seu produto em detalhes..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Imagens do Produto</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="images"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="images" className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">Clique para fazer upload ou arraste as imagens aqui</p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG ou JPEG (máx. 5MB por imagem)</p>
                      </div>
                    </label>
                  </div>

                  {imagePreview.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-4">
                      {imagePreview.map((src, index) => (
                        <div key={index} className="relative">
                          <img
                            src={src || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            className="h-24 w-24 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                            onClick={() => removeImage(index)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <CardFooter className="flex justify-end gap-2 px-0">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Enviando..." : "Enviar para Aprovação"}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
