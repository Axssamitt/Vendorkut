import Image from "next/image"
import Link from "next/link"
import { Users, MessageCircle, Share2, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { allCommunities } from "@/data/communities"

interface CommunityPageProps {
  params: {
    id: string
  }
}

export default function CommunityPage({ params }: CommunityPageProps) {
  // Na prática, você buscaria os dados da comunidade de uma API ou banco de dados
  const community = allCommunities.find((c) => c.id === params.id) || allCommunities[0]

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-6">
          {/* Community Header */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="relative w-[150px] h-[150px] shrink-0">
              <Image
                src={community.image || "/placeholder.svg?height=150&width=150"}
                alt={community.name}
                fill
                className="object-cover rounded-lg border"
              />
            </div>
            <div className="space-y-4 flex-1">
              <div>
                <h1 className="text-2xl font-bold">{community.name}</h1>
                <p className="text-muted-foreground">Categoria: {community.category}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">{community.memberCount} membros</span>
                </div>
              </div>
              <p>{community.description}</p>
              <div className="flex flex-wrap gap-2">
                <Button className="orkut-button">Participar</Button>
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Receber notificações</span>
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Compartilhar</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Community Content */}
          <Tabs defaultValue="forum">
            <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
              <TabsTrigger value="forum">Fórum</TabsTrigger>
              <TabsTrigger value="membros">Membros</TabsTrigger>
              <TabsTrigger value="produtos">Produtos</TabsTrigger>
            </TabsList>
            <TabsContent value="forum" className="space-y-4 mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" alt="Usuário" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <textarea
                        className="w-full p-2 border rounded-lg resize-none"
                        rows={3}
                        placeholder="Compartilhe algo com a comunidade..."
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button className="orkut-button">Publicar</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Forum Posts */}
              <div className="space-y-4">
                <ForumPost
                  user={{ name: "Carlos Silva", avatar: "/placeholder-user.jpg" }}
                  content="Pessoal, alguém tem recomendações de produtos para iniciantes nessa área?"
                  time="2 horas atrás"
                  comments={3}
                  likes={12}
                />
                <ForumPost
                  user={{ name: "Ana Oliveira", avatar: "/placeholder-user.jpg" }}
                  content="Acabei de adquirir o novo modelo XYZ e estou adorando! Alguém mais já testou?"
                  time="5 horas atrás"
                  comments={7}
                  likes={24}
                />
                <ForumPost
                  user={{ name: "Pedro Santos", avatar: "/placeholder-user.jpg" }}
                  content="Estou organizando um evento presencial para o próximo mês. Quem tiver interesse, comente abaixo!"
                  time="1 dia atrás"
                  comments={15}
                  likes={42}
                />
              </div>
            </TabsContent>
            <TabsContent value="membros" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Array(9)
                  .fill(0)
                  .map((_, i) => (
                    <MemberCard
                      key={i}
                      name={["Carlos Silva", "Ana Oliveira", "Pedro Santos", "Mariana Costa", "Lucas Mendes"][i % 5]}
                      role={i === 0 ? "Dono" : i < 3 ? "Moderador" : "Membro"}
                      joinedDate="Membro desde Jan 2024"
                    />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="produtos" className="space-y-4 mt-6">
              <p className="text-muted-foreground">Produtos relacionados a esta comunidade:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <ProductCard
                      key={i}
                      name={["Kit Iniciante", "Acessório Premium", "Guia Completo"][i]}
                      price={[99.9, 149.9, 79.9][i]}
                      seller={["TechStore", "SportFit", "CasaModerna"][i]}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-medium">Sobre a Comunidade</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Criada por:</strong> {community.owner.name}
                </p>
                <p>
                  <strong>Tipo:</strong> {community.isPrivate ? "Privada" : "Pública"}
                </p>
                <p>
                  <strong>Idioma:</strong> Português
                </p>
                <p>
                  <strong>Criada em:</strong> Janeiro de 2024
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-medium">Comunidades Relacionadas</h3>
              <div className="space-y-3">
                {allCommunities.slice(0, 3).map((relatedCommunity) => (
                  <Link
                    key={relatedCommunity.id}
                    href={`/comunidades/${relatedCommunity.id}`}
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    <div className="relative w-10 h-10">
                      <Image
                        src={relatedCommunity.image || "/placeholder.svg?height=40&width=40"}
                        alt={relatedCommunity.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{relatedCommunity.name}</p>
                      <p className="text-xs text-muted-foreground">{relatedCommunity.memberCount} membros</p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-medium">Eventos Próximos</h3>
              <div className="space-y-3">
                <div className="border rounded-md p-3">
                  <p className="font-medium">Encontro Mensal</p>
                  <p className="text-sm text-muted-foreground">15 de Maio, 19:00</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="outline" size="sm" className="text-xs h-7">
                      Participar
                    </Button>
                    <span className="text-xs text-muted-foreground">32 confirmados</span>
                  </div>
                </div>
                <div className="border rounded-md p-3">
                  <p className="font-medium">Workshop Online</p>
                  <p className="text-sm text-muted-foreground">22 de Maio, 15:00</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="outline" size="sm" className="text-xs h-7">
                      Participar
                    </Button>
                    <span className="text-xs text-muted-foreground">18 confirmados</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

interface ForumPostProps {
  user: {
    name: string
    avatar: string
  }
  content: string
  time: string
  comments: number
  likes: number
}

function ForumPost({ user, content, time, comments, likes }: ForumPostProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{time}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <span className="sr-only">Mais opções</span>
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
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </Button>
            </div>
            <p className="mt-2">{content}</p>
            <div className="flex items-center gap-4 mt-4">
              <Button variant="ghost" size="sm" className="h-8 gap-1">
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
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span>{likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{comments}</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8">
                <Share2 className="h-4 w-4 mr-1" />
                <span>Compartilhar</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface MemberCardProps {
  name: string
  role: string
  joinedDate: string
}

function MemberCard({ name, role, joinedDate }: MemberCardProps) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-3">
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
          <p className="text-xs text-muted-foreground">{joinedDate}</p>
        </div>
      </CardContent>
    </Card>
  )
}

interface ProductCardProps {
  name: string
  price: number
  seller: string
}

function ProductCard({ name, price, seller }: ProductCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="relative w-full aspect-square mb-3">
          <Image src="/placeholder.svg?height=200&width=200" alt={name} fill className="object-cover rounded-md" />
        </div>
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-muted-foreground">Vendido por {seller}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="font-bold">R$ {price.toFixed(2)}</p>
          <Button size="sm" className="rounded-full">
            Comprar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
