import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader } from "@/components/app-header";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "Messages — LocalPilot" },
      { name: "description", content: "All customer conversations in one inbox." },
      { property: "og:title", content: "Messages — LocalPilot" },
      { property: "og:description", content: "All customer conversations in one inbox." },
    ],
  }),
  component: Messages,
});

const msgs = [
  { name: "Pedro Santos", text: "Hi! How much is a haircut + beard?", time: "10:24", unread: true },
  { name: "Beatriz Lima", text: "Can I move my appointment to 11:30?", time: "09:58", unread: true },
  { name: "João Silva", text: "Confirmed, see you tomorrow 👍", time: "Yesterday", unread: false },
];

function Messages() {
  return (
    <>
      <PageHeader title="Messages" subtitle="Customer conversations from WhatsApp, SMS and Google." />
      <Card className="shadow-card p-0">
        <CardContent className="divide-y p-0">
          {msgs.map((m) => (
            <div key={m.name} className="flex items-center gap-3 p-4">
              <Avatar><AvatarFallback className="bg-accent text-accent-foreground">{m.name[0]}</AvatarFallback></Avatar>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{m.name}</p>
                <p className="truncate text-sm text-muted-foreground">{m.text}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-muted-foreground">{m.time}</span>
                {m.unread && <span className="size-2 rounded-full bg-primary" />}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
