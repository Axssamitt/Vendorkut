import { Suspense } from "react"
import Link from "next/link"
import { Grid3X3, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProductCard from "@/components/product-card"
import { allProducts } from "@/data/products"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductsPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Catálogo de Produtos</h1>
          <p className="text-muted-foreground">Encontre os melhores produtos da nossa comunidade</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Categorias</h3>
              <div className="space-y-2">
                <Link href="/produtos?categoria=eletronicos" className="block text-sm hover:text-primary">
                  Eletrônicos
                </Link>
                <Link href="/produtos?categoria=moda" className="block text-sm hover:text-primary">
                  Moda
                </Link>
                <Link href="/produtos?categoria=casa" className="block text-sm hover:text-primary">
                  Casa e Decoração
                </Link>
                <Link href="/produtos?categoria=esportes" className="block text-sm hover:text-primary">
                  Esportes
                </Link>
                <Link href="/produtos?categoria=beleza" className="block text-sm hover:text-primary">
                  Beleza e Saúde
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Preço</h3>
              <div className="grid grid-cols-2 gap-2">
                <Input type="number" placeholder="Min" className="h-9" />
                <Input type="number" placeholder="Max" className="h-9" />
              </div>
              <Button size="sm" className="w-full">
                Aplicar
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Avaliação</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="rating-5" className="mr-2" />
                  <label htmlFor="rating-5" className="text-sm">
                    5 estrelas
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="rating-4" className="mr-2" />
                  <label htmlFor="rating-4" className="text-sm">
                    4 estrelas ou mais
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="rating-3" className="mr-2" />
                  <label htmlFor="rating-3" className="text-sm">
                    3 estrelas ou mais
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="relative w-full sm:w-[300px]">
                <Input placeholder="Buscar produtos..." className="w-full" />
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Select defaultValue="relevancia">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevancia">Relevância</SelectItem>
                    <SelectItem value="preco-menor">Menor Preço</SelectItem>
                    <SelectItem value="preco-maior">Maior Preço</SelectItem>
                    <SelectItem value="mais-recente">Mais Recentes</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center border rounded-md">
                  <Button variant="ghost" size="icon" className="rounded-l-md">
                    <Grid3X3 className="h-4 w-4" />
                    <span className="sr-only">Visualização em grade</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-r-md">
                    <List className="h-4 w-4" />
                    <span className="sr-only">Visualização em lista</span>
                  </Button>
                </div>
              </div>
            </div>

            <Suspense fallback={<ProductsLoadingSkeleton />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </Suspense>

            <div className="flex justify-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" disabled>
                  &lt;
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-white">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="icon">
                  &gt;
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-5 w-1/4" />
                <Skeleton className="h-9 w-1/3 rounded-full" />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
