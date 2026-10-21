import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader } from "@/components/app-header";

export const Route = createFileRoute("/appointments")({
  head: () => ({
    meta: [
      { title: "Appointments — LocalPilot" },
      { name: "description", content: "Manage upcoming client appointments and their status." },
      { property: "og:title", content: "Appointments — LocalPilot" },
      { property: "og:description", content: "Manage upcoming client appointments and their status." },
    ],
  }),
  component: Appointments,
});

type Status = "Confirmed" | "Pending" | "Cancelled";
const rows: { name: string; service: string; time: string; status: Status }[] = [
  { name: "João Silva", service: "Haircut & Beard", time: "Today, 09:00", status: "Confirmed" },
  { name: "Maria Oliveira", service: "Hair Coloring", time: "Today, 10:30", status: "Pending" },
  { name: "Pedro Santos", service: "Classic Haircut", time: "Today, 13:00", status: "Confirmed" },
  { name: "Carla Souza", service: "Manicure", time: "Today, 15:15", status: "Cancelled" },
  { name: "Lucas Pereira", service: "Beard Trim", time: "Tomorrow, 08:30", status: "Confirmed" },
  { name: "Beatriz Lima", service: "Blowout", time: "Tomorrow, 11:00", status: "Pending" },
];
const variant = { Confirmed: "success", Pending: "warning", Cancelled: "danger" } as const;

function Appointments() {
  return (
    <>
      <PageHeader
        title="Appointments"
        subtitle="Upcoming bookings for the next 48 hours."
        action={
          <Button size="lg" onClick={() => toast.success("New appointment form coming soon")}>
            <Plus /> New Appointment
          </Button>
        }
      />
      <Card className="overflow-hidden p-0 shadow-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="pl-5">Client Name</TableHead>
              <TableHead className="hidden sm:table-cell">Service Type</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="pr-5 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.name}>
                <TableCell className="py-4 pl-5">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-accent text-xs text-accent-foreground">
                        {r.name.split(" ").map((p) => p[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{r.name}</p>
                      <p className="text-xs text-muted-foreground sm:hidden">{r.service}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden text-muted-foreground sm:table-cell">{r.service}</TableCell>
                <TableCell className="whitespace-nowrap">{r.time}</TableCell>
                <TableCell className="pr-5 text-right">
                  <Badge variant={variant[r.status]}>{r.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
