import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import CommunityCard from "@/components/community-card"
import { featuredProducts } from "@/data/products"
import { popularCommunities } from "@/data/communities"

export default function Home() {
  return (
    <div className="flex flex-col gap-10 py-8">
      {/* Hero Section */}
      <section className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Bem-vindo ao Vendorkut
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Compre, venda e conecte-se em comunidades de interesses comuns. A nostalgia do Orkut com o poder do
                e-commerce.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/produtos">
                <Button className="orkut-button">Ver Produtos</Button>
              </Link>
              <Link href="/comunidades">
                <Button variant="outline">Explorar Comunidades</Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px]">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Hero Image"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Produtos em Destaque</h2>
            <Link href="/produtos" className="text-primary hover:underline">
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Communities */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Comunidades Populares</h2>
            <Link href="/comunidades" className="text-primary hover:underline">
              Ver todas
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularCommunities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        </div>
      </section>

      {/* Join Banner */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Junte-se à nossa comunidade</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Crie seu perfil, conecte-se com amigos, participe de comunidades e encontre produtos incríveis.
              </p>
            </div>
            <Link href="/cadastro">
              <Button className="orkut-button">Cadastre-se Grátis</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
