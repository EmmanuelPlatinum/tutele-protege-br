import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { PageHeader } from "@/components/app-header";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — LocalPilot" },
      { name: "description", content: "Configure automations and notifications for your business." },
      { property: "og:title", content: "Settings — LocalPilot" },
      { property: "og:description", content: "Configure automations and notifications for your business." },
    ],
  }),
  component: SettingsPage,
});

const opts = [
  { t: "Appointment reminders", d: "Send SMS reminders 24h before each booking." },
  { t: "Auto-reply to reviews", d: "Reply automatically to 4 and 5-star reviews." },
  { t: "Daily summary email", d: "Get a recap of your day every evening." },
];

function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" subtitle="Automations and notifications." />
      <Card className="shadow-card">
        <CardHeader><CardTitle>Automations</CardTitle><CardDescription>Turn features on or off.</CardDescription></CardHeader>
        <CardContent className="space-y-5">
          {opts.map((o) => (
            <div key={o.t} className="flex items-center justify-between gap-4">
              <div><p className="font-medium">{o.t}</p><p className="text-sm text-muted-foreground">{o.d}</p></div>
              <Switch defaultChecked />
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
