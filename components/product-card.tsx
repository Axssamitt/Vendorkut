import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="orkut-card overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={product.image || "/placeholder.svg?height=300&width=300"}
          alt={product.name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full h-8 w-8"
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Adicionar aos favoritos</span>
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="space-y-1">
          <Link href={`/produtos/${product.id}`} className="hover:underline">
            <h3 className="font-medium">{product.name}</h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="font-bold text-lg">R$ {product.price.toFixed(2)}</div>
        <Button size="sm" className="rounded-full">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Comprar
        </Button>
      </CardFooter>
    </Card>
  )
}
