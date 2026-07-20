"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ArrowRight } from "lucide-react"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface DocType {
  id: string
  key: string
  name: string
  config: any
}

interface DocRecord {
  id: string
  code: string | null
  status: string | null
  createdAt: string
  data: any
}

interface Props {
  goodsInType: DocType | null
  goodsInDocs: DocRecord[]
  goodsOutType: DocType | null
  goodsOutDocs: DocRecord[]
}

export function InboundOutboundClient({ goodsInType, goodsInDocs, goodsOutType, goodsOutDocs }: Props) {
  return (
    <div className="space-y-6">
       <div>
          <h1 className="text-2xl font-semibold text-slate-900">Inbound & Outbound</h1>
          <p className="text-sm text-slate-500">Manage inbound and outbound item requests.</p>
       </div>

       <Tabs defaultValue="inbound" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 h-auto p-1 bg-slate-100 rounded-lg">
          <TabsTrigger value="inbound" className="py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all">Inbound Items</TabsTrigger>
          <TabsTrigger value="outbound" className="py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all">Outbound Items</TabsTrigger>
        </TabsList>
        
        <TabsContent value="inbound" className="mt-0">
             {goodsInType ? (
                <DocList docType={goodsInType} docs={goodsInDocs} title="Inbound Item Requests" />
             ) : (
                <div className="p-4 border rounded bg-slate-50 text-slate-500 text-center">Goods In document type not found.</div>
             )}
        </TabsContent>
        <TabsContent value="outbound" className="mt-0">
             {goodsOutType ? (
                <DocList docType={goodsOutType} docs={goodsOutDocs} title="Outbound Item Requests" />
             ) : (
                <div className="p-4 border rounded bg-slate-50 text-slate-500 text-center">Goods Out document type not found.</div>
             )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function DocList({ docType, docs, title }: { docType: DocType, docs: DocRecord[], title: string }) {
  const listFields = (docType.config?.listFields as string[]) || ["request_date", "status"]

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="outline">
                <Link href={`/customer/docs/${docType.key}`}>
                    View All <ArrowRight className="ml-1 w-3 h-3" />
                </Link>
            </Button>
            <Button asChild size="sm">
                <Link href={`/customer/docs/${docType.key}/create`}>
                    <Plus className="mr-1 w-3 h-3" /> Create New
                </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50">
              <TableHead className="w-[150px]">Code</TableHead>
              {listFields.map(f => (
                  <TableHead key={f} className="capitalize">{f.replace(/_/g, " ")}</TableHead>
              ))}
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[150px]">Date Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {docs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={listFields.length + 3} className="h-32 text-center text-muted-foreground">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p>No request data yet.</p>
                    <Button asChild size="sm" variant="outline">
                        <Link href={`/customer/docs/${docType.key}/create`}>
                            <Plus className="mr-1 w-3 h-3" /> Create New Request
                        </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              docs.map((doc) => (
                <TableRow key={doc.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium">
                    <Link href={`/customer/docs/${docType.key}/${doc.id}`} className="hover:underline text-primary">
                        {doc.code || "DRAFT"}
                    </Link>
                  </TableCell>
                  {listFields.map(f => (
                      <TableCell key={f}>
                          {String((doc.data as any)?.[f] ?? "-")}
                      </TableCell>
                  ))}
                  <TableCell>
                    <Badge variant="outline">{doc.status || "Draft"}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {new Date(doc.createdAt).toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' })}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
