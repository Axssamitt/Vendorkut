import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Share2, Star, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { allProducts } from "@/data/products"
import ProductCard from "@/components/product-card"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  // Na prática, você buscaria os dados do produto de uma API ou banco de dados
  const product = allProducts.find((p) => p.id === params.id) || allProducts[0]

  // Produtos relacionados (simulados)
  const relatedProducts = allProducts.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4)

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full">
            <Image
              src={product.image || "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="relative aspect-square cursor-pointer border rounded-md overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=150&width=150&text=Imagem ${i + 1}`}
                    alt={`${product.name} - Imagem ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({Math.floor(product.rating * 10)} avaliações)
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-3xl font-bold">R$ {product.price.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">
              Em até 12x de R$ {(product.price / 12).toFixed(2)} sem juros
            </p>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <Truck className="h-4 w-4" />
              <span>Frete grátis para todo o Brasil</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium">Vendido e entregue por:</p>
            <Link href={`/vendedor/${product.seller.id}`} className="flex items-center gap-2 hover:text-primary">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder-user.jpg" alt={product.seller.name} />
                <AvatarFallback>{product.seller.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{product.seller.name}</span>
            </Link>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button className="orkut-button h-12">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Comprar Agora
              </Button>
              <Button variant="outline" className="h-12">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Adicionar ao Carrinho
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" className="flex-1">
                <Heart className="h-4 w-4 mr-2" />
                Favoritar
              </Button>
              <Button variant="ghost" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-medium">Descrição</h3>
              <p className="text-sm">{product.description}</p>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in velit vitae nisi bibendum ultrices.
                Suspendisse potenti. Sed auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam
                nisl nisl eget nisl.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="detalhes">
          <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex">
            <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
            <TabsTrigger value="especificacoes">Especificações</TabsTrigger>
            <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
          </TabsList>
          <TabsContent value="detalhes" className="mt-6 space-y-4">
            <h3 className="text-lg font-medium">Detalhes do Produto</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in velit vitae nisi bibendum ultrices.
              Suspendisse potenti. Sed auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl
              nisl eget nisl.
            </p>
            <p>
              Praesent euismod, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.
              Nullam in velit vitae nisi bibendum ultrices. Suspendisse potenti. Sed auctor, nisl eget ultricies
              tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Característica 1: Lorem ipsum dolor sit amet</li>
              <li>Característica 2: Consectetur adipiscing elit</li>
              <li>Característica 3: Nullam in velit vitae nisi bibendum ultrices</li>
              <li>Característica 4: Suspendisse potenti</li>
            </ul>
          </TabsContent>
          <TabsContent value="especificacoes" className="mt-6">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 bg-muted font-medium">Marca</td>
                    <td className="p-3">Marca XYZ</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 bg-muted font-medium">Modelo</td>
                    <td className="p-3">Modelo ABC</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 bg-muted font-medium">Dimensões</td>
                    <td className="p-3">10 x 20 x 5 cm</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 bg-muted font-medium">Peso</td>
                    <td className="p-3">500g</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 bg-muted font-medium">Material</td>
                    <td className="p-3">Alumínio e Plástico</td>
                  </tr>
                  <tr>
                    <td className="p-3 bg-muted font-medium">Garantia</td>
                    <td className="p-3">12 meses</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="avaliacoes" className="mt-6 space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3 space-y-4">
                <div className="text-center">
                  <div className="text-5xl font-bold">{product.rating.toFixed(1)}</div>
                  <div className="flex justify-center mt-2">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{Math.floor(product.rating * 10)} avaliações</p>
                </div>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2">
                      <div className="text-sm w-2">{star}</div>
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div className="bg-yellow-400 h-2" style={{ width: `${Math.random() * 100}%` }}></div>
                      </div>
                      <div className="text-sm text-muted-foreground w-8">{Math.floor(Math.random() * 50)}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:w-2/3 space-y-4">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarImage src="/placeholder-user.jpg" alt="Usuário" />
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Usuário {i + 1}</p>
                              <p className="text-xs text-muted-foreground">
                                há {i + 1} {i === 0 ? "dia" : "dias"}
                              </p>
                            </div>
                          </div>
                          <div className="flex">
                            {Array(5)
                              .fill(0)
                              .map((_, j) => (
                                <Star
                                  key={j}
                                  className={`h-4 w-4 ${j < 5 - i ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                          </div>
                        </div>
                        <p className="mt-3">
                          {
                            [
                              "Produto excelente! Superou minhas expectativas em todos os aspectos. Recomendo fortemente.",
                              "Bom produto, atendeu ao que eu precisava. A entrega foi rápida e o produto chegou em perfeito estado.",
                              "Produto razoável pelo preço. Algumas funcionalidades poderiam ser melhores, mas no geral estou satisfeito.",
                            ][i]
                          }
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                <Button variant="outline" className="w-full">
                  Ver Todas as Avaliações
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-12 space-y-4">
        <h2 className="text-2xl font-bold">Produtos Relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>
    </div>
  )
}
