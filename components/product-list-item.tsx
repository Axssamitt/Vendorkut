import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types/product"

interface ProductListItemProps {
  product: Product
}

export default function ProductListItem({ product }: ProductListItemProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg bg-white">
      <div className="relative w-full sm:w-[120px] h-[120px]">
        <Image
          src={product.image || "/placeholder.svg?height=120&width=120"}
          alt={product.name}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/produtos/${product.id}`} className="hover:underline">
            <h3 className="font-medium">{product.name}</h3>
          </Link>
          <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="font-bold text-lg">R$ {product.price.toFixed(2)}</div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
              <Heart className="h-4 w-4" />
              <span className="sr-only">Adicionar aos favoritos</span>
            </Button>
            <Button size="sm" className="rounded-full">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Comprar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
