import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, Star, MessageSquare, DollarSign, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { PageHeader } from "@/components/app-header";

export const Route = createFileRoute("/_dashboard/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — LocalPilot" },
      { name: "description", content: "Your business at a glance: appointments, reviews, messages and revenue." },
      { property: "og:title", content: "Dashboard — LocalPilot" },
      { property: "og:description", content: "Your business at a glance: appointments, reviews, messages and revenue." },
    ],
  }),
  component: Dashboard,
});

const kpis = [
  { label: "Appointments Today", value: "12", delta: "+3 vs yesterday", icon: CalendarCheck },
  { label: "New Reviews", value: "8", delta: "4.8 avg rating", icon: Star },
  { label: "Unread Messages", value: "5", delta: "2 need reply", icon: MessageSquare },
  { label: "Total Revenue", value: "R$ 4.280", delta: "+12% this week", icon: DollarSign },
];

const data = [
  { day: "Mon", engagement: 120 },
  { day: "Tue", engagement: 158 },
  { day: "Wed", engagement: 142 },
  { day: "Thu", engagement: 189 },
  { day: "Fri", engagement: 230 },
  { day: "Sat", engagement: 264 },
  { day: "Sun", engagement: 198 },
];
const config = { engagement: { label: "Engagement", color: "var(--chart-1)" } } satisfies ChartConfig;

const activity = [
  { icon: CalendarCheck, text: "João confirmed his appointment", time: "5 min ago" },
  { icon: Star, text: "New 5-star review from Maria", time: "22 min ago" },
  { icon: MessageSquare, text: "Pedro sent a message about pricing", time: "1 h ago" },
  { icon: CalendarCheck, text: "Carla booked a haircut for Friday", time: "2 h ago" },
  { icon: Star, text: "New 4-star review from Lucas", time: "4 h ago" },
];

function Dashboard() {
  return (
    <>
      <PageHeader title="Good afternoon, Ana" subtitle="Here's what's happening with your business today." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label} className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">{k.label}</p>
                <div className="flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <k.icon className="size-4" />
                </div>
              </div>
              <p className="mt-3 text-3xl font-semibold tracking-tight">{k.value}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="size-3 text-success" /> {k.delta}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle>Customer Engagement</CardTitle>
            <CardDescription>Bookings, messages and reviews — last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={config} className="h-[280px] w-full">
              <AreaChart data={data} margin={{ left: -20, right: 8 }}>
                <defs>
                  <linearGradient id="fillEng" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-engagement)" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="var(--color-engagement)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="engagement" stroke="var(--color-engagement)" strokeWidth={2.5} fill="url(#fillEng)" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest events across your channels</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {activity.map((a, i) => (
                <li key={i} className="flex gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <a.icon className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug">{a.text}</p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
