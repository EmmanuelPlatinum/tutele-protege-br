import { createFileRoute } from "@tanstack/react-router";
import { Plus, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/app-header";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/_dashboard/cases")({
  head: () => ({
    meta: [
      { title: "Casos — Protege" },
      { name: "description", content: "Gestão de casos sigilosos do Conselho Tutelar." },
      { property: "og:title", content: "Casos — Protege" },
      { property: "og:description", content: "Gestão de casos sigilosos do Conselho Tutelar." },
    ],
  }),
  component: Cases,
});

type S = "open" | "urgent" | "closed";
const rows: { id: string; family: string; type: number; counselor: string; status: S }[] = [
  { id: "#1042", family: "Silva", type: 0, counselor: "Ana Costa", status: "urgent" },
  { id: "#1041", family: "Souza", type: 1, counselor: "Marcos Lima", status: "open" },
  { id: "#1039", family: "Oliveira", type: 2, counselor: "Ana Costa", status: "urgent" },
  { id: "#1038", family: "Pereira", type: 3, counselor: "Júlia Rocha", status: "open" },
  { id: "#1035", family: "Santos", type: 4, counselor: "Marcos Lima", status: "closed" },
];
const variant = { open: "warning", urgent: "danger", closed: "success" } as const;

function Cases() {
  const { t } = useI18n();
  return (
    <>
      <PageHeader title={t.cases.title} subtitle={t.cases.sub}
        action={<Button size="lg" onClick={() => toast.success(t.cases.created)}><Plus /> {t.cases.new}</Button>} />
      <Card className="overflow-hidden shadow-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.cases.id}</TableHead><TableHead>{t.cases.family}</TableHead>
              <TableHead className="hidden sm:table-cell">{t.cases.type}</TableHead>
              <TableHead className="hidden md:table-cell">{t.cases.counselor}</TableHead>
              <TableHead>{t.cases.status}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-mono text-xs"><span className="inline-flex items-center gap-1"><Lock className="size-3 text-muted-foreground" />{r.id}</span></TableCell>
                <TableCell className="font-medium">{t.cases.family} {r.family}</TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground">{t.caseTypes[r.type]}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">{r.counselor}</TableCell>
                <TableCell><Badge variant={variant[r.status]}>{t.status[r.status]}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
