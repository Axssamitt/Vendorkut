import { Suspense } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CommunityCard from "@/components/community-card"
import { allCommunities } from "@/data/communities"
import { Skeleton } from "@/components/ui/skeleton"

export default function CommunitiesPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Comunidades</h1>
          <p className="text-muted-foreground">Encontre pessoas com interesses em comum e compartilhe experiências</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar comunidades..." className="pl-8 w-full" />
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Select defaultValue="populares">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="populares">Mais Populares</SelectItem>
                <SelectItem value="recentes">Mais Recentes</SelectItem>
                <SelectItem value="ativas">Mais Ativas</SelectItem>
              </SelectContent>
            </Select>

            <Link href="/comunidades/criar">
              <Button className="orkut-button">Criar Comunidade</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          {/* Categories Sidebar */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Categorias</h3>
              <div className="space-y-2">
                <Link href="/comunidades?categoria=tecnologia" className="block text-sm hover:text-primary">
                  Tecnologia
                </Link>
                <Link href="/comunidades?categoria=esportes" className="block text-sm hover:text-primary">
                  Esportes
                </Link>
                <Link href="/comunidades?categoria=musica" className="block text-sm hover:text-primary">
                  Música
                </Link>
                <Link href="/comunidades?categoria=jogos" className="block text-sm hover:text-primary">
                  Jogos
                </Link>
                <Link href="/comunidades?categoria=culinaria" className="block text-sm hover:text-primary">
                  Culinária
                </Link>
                <Link href="/comunidades?categoria=moda" className="block text-sm hover:text-primary">
                  Moda
                </Link>
                <Link href="/comunidades?categoria=viagens" className="block text-sm hover:text-primary">
                  Viagens
                </Link>
                <Link href="/comunidades?categoria=filmes" className="block text-sm hover:text-primary">
                  Filmes e Séries
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Filtros</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="minhas-comunidades" className="mr-2" />
                  <label htmlFor="minhas-comunidades" className="text-sm">
                    Minhas comunidades
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="comunidades-amigos" className="mr-2" />
                  <label htmlFor="comunidades-amigos" className="text-sm">
                    Comunidades dos amigos
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="comunidades-abertas" className="mr-2" />
                  <label htmlFor="comunidades-abertas" className="text-sm">
                    Abertas para participação
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Communities Grid */}
          <div className="space-y-6">
            <Suspense fallback={<CommunitiesLoadingSkeleton />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allCommunities.map((community) => (
                  <CommunityCard key={community.id} community={community} />
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

function CommunitiesLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[150px] w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-9 w-full rounded-md" />
            </div>
          </div>
        ))}
    </div>
  )
}
