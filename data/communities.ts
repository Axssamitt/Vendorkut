import type { Community } from "@/types/community"

export const popularCommunities: Community[] = [
  {
    id: "1",
    name: "Amantes de Tecnologia",
    description: "Comunidade para discussão sobre as últimas novidades em tecnologia e gadgets.",
    image: "/placeholder.svg?height=200&width=300",
    category: "tecnologia",
    memberCount: 5432,
    owner: {
      id: "user1",
      name: "Carlos Silva",
    },
    isPrivate: false,
  },
  {
    id: "2",
    name: "Cozinheiros de Plantão",
    description: "Compartilhe receitas, dicas culinárias e descubra novos pratos.",
    image: "/placeholder.svg?height=200&width=300",
    category: "culinaria",
    memberCount: 3876,
    owner: {
      id: "user2",
      name: "Ana Oliveira",
    },
    isPrivate: false,
  },
  {
    id: "3",
    name: "Gamers Unidos",
    description: "Para os apaixonados por jogos eletrônicos de todas as plataformas.",
    image: "/placeholder.svg?height=200&width=300",
    category: "jogos",
    memberCount: 7890,
    owner: {
      id: "user3",
      name: "Pedro Santos",
    },
    isPrivate: false,
  },
  {
    id: "4",
    name: "Viajantes do Mundo",
    description: "Compartilhe experiências de viagens e dicas de destinos incríveis.",
    image: "/placeholder.svg?height=200&width=300",
    category: "viagens",
    memberCount: 2543,
    owner: {
      id: "user4",
      name: "Mariana Costa",
    },
    isPrivate: false,
  },
]

export const allCommunities: Community[] = [
  ...popularCommunities,
  {
    id: "5",
    name: "Cinéfilos Anônimos",
    description: "Para os amantes de cinema, séries e cultura pop.",
    image: "/placeholder.svg?height=200&width=300",
    category: "filmes",
    memberCount: 4321,
    owner: {
      id: "user5",
      name: "Lucas Mendes",
    },
    isPrivate: false,
  },
  {
    id: "6",
    name: "Músicos e Compositores",
    description: "Compartilhe suas composições e discuta sobre teoria musical.",
    image: "/placeholder.svg?height=200&width=300",
    category: "musica",
    memberCount: 1987,
    owner: {
      id: "user6",
      name: "Juliana Alves",
    },
    isPrivate: false,
  },
  {
    id: "7",
    name: "Empreendedores Digitais",
    description: "Troca de experiências sobre negócios online e marketing digital.",
    image: "/placeholder.svg?height=200&width=300",
    category: "negocios",
    memberCount: 3210,
    owner: {
      id: "user7",
      name: "Roberto Gomes",
    },
    isPrivate: false,
  },
  {
    id: "8",
    name: "Fotografia Criativa",
    description: "Compartilhe suas fotos e aprenda técnicas de fotografia.",
    image: "/placeholder.svg?height=200&width=300",
    category: "arte",
    memberCount: 2876,
    owner: {
      id: "user8",
      name: "Camila Rocha",
    },
    isPrivate: false,
  },
  {
    id: "9",
    name: "Esportes Radicais",
    description: "Para os amantes de adrenalina e esportes de aventura.",
    image: "/placeholder.svg?height=200&width=300",
    category: "esportes",
    memberCount: 1543,
    owner: {
      id: "user9",
      name: "Fernando Lima",
    },
    isPrivate: false,
  },
]
