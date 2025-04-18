import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, ShoppingBag, AlertCircle, CheckCircle, UserCheck, TrendingUp, Activity } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Administrativo</h1>
        <p className="text-muted-foreground">Bem-vindo ao painel de controle administrativo do Vendorkut.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Totais</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos Ativos</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,456</div>
            <p className="text-xs text-muted-foreground">+8% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprovações Pendentes</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">12 usuários, 12 produtos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas Realizadas</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 45.231,89</div>
            <p className="text-xs text-muted-foreground">+18% em relação ao mês anterior</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pendentes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pendentes">Aprovações Pendentes</TabsTrigger>
          <TabsTrigger value="atividade">Atividade Recente</TabsTrigger>
        </TabsList>
        <TabsContent value="pendentes" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Usuários Pendentes
                </CardTitle>
                <CardDescription>Usuários aguardando aprovação de cadastro</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "João Silva", email: "joao@email.com", document: "123.456.789-00", date: "2023-05-01" },
                    {
                      name: "Maria Oliveira",
                      email: "maria@email.com",
                      document: "987.654.321-00",
                      date: "2023-05-02",
                    },
                    {
                      name: "Carlos Santos",
                      email: "carlos@email.com",
                      document: "111.222.333-44",
                      date: "2023-05-03",
                    },
                  ].map((user, i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">CPF: {user.document}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="rounded-full p-2 text-green-600 hover:bg-green-100">
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button className="rounded-full p-2 text-red-600 hover:bg-red-100">
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
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Produtos Pendentes
                </CardTitle>
                <CardDescription>Produtos aguardando aprovação para venda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Smartphone XYZ", seller: "TechStore", price: "R$ 1.999,00", date: "2023-05-01" },
                    { name: "Notebook Ultra", seller: "InfoShop", price: "R$ 4.500,00", date: "2023-05-02" },
                    { name: "Fone de Ouvido Pro", seller: "AudioTech", price: "R$ 350,00", date: "2023-05-03" },
                  ].map((product, i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">Vendedor: {product.seller}</p>
                        <p className="text-xs text-muted-foreground">Preço: {product.price}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="rounded-full p-2 text-green-600 hover:bg-green-100">
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button className="rounded-full p-2 text-red-600 hover:bg-red-100">
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
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="atividade">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Atividade Recente
              </CardTitle>
              <CardDescription>Ações administrativas realizadas recentemente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Usuário aprovado", admin: "Admin1", target: "João Silva", date: "2023-05-04 14:30" },
                  {
                    action: "Produto rejeitado",
                    admin: "Admin2",
                    target: "Câmera Digital X",
                    date: "2023-05-04 13:15",
                  },
                  { action: "Permissão alterada", admin: "Admin1", target: "Maria Oliveira", date: "2023-05-04 11:45" },
                  { action: "Produto aprovado", admin: "Admin3", target: "Notebook Ultra", date: "2023-05-04 10:20" },
                  { action: "Usuário bloqueado", admin: "Admin2", target: "Pedro Santos", date: "2023-05-04 09:10" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">Item: {activity.target}</p>
                      <p className="text-xs text-muted-foreground">Por: {activity.admin}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">{activity.date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
