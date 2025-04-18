import Link from "next/link"
import Image from "next/image"
import { Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Community } from "@/types/community"

interface CommunityCardProps {
  community: Community
}

export default function CommunityCard({ community }: CommunityCardProps) {
  return (
    <Card className="orkut-card overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={community.image || "/placeholder.svg?height=200&width=300"}
          alt={community.name}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="space-y-1">
          <Link href={`/comunidades/${community.id}`} className="hover:underline">
            <h3 className="font-medium">{community.name}</h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2">{community.description}</p>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            <span>{community.memberCount} membros</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" size="sm" className="w-full">
          Participar
        </Button>
      </CardFooter>
    </Card>
  )
}
