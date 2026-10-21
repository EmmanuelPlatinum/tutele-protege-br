import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Reply, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader } from "@/components/app-header";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_dashboard/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — LocalPilot" },
      { name: "description", content: "Monitor and reply to Google reviews to manage your reputation." },
      { property: "og:title", content: "Reviews — LocalPilot" },
      { property: "og:description", content: "Monitor and reply to Google reviews to manage your reputation." },
    ],
  }),
  component: Reviews,
});

const reviews = [
  { name: "Maria Oliveira", rating: 5, date: "2 hours ago", text: "Amazing service! The team was friendly and my hair looks fantastic. Will definitely come back." },
  { name: "Lucas Pereira", rating: 4, date: "Yesterday", text: "Great haircut, a bit of a wait though. Overall a good experience." },
  { name: "Fernanda Rocha", rating: 2, date: "2 days ago", text: "My appointment was delayed by 30 minutes and nobody let me know." },
  { name: "Rafael Alves", rating: 5, date: "3 days ago", text: "Best barbershop in town. Online booking is super easy." },
  { name: "Juliana Costa", rating: 3, date: "1 week ago", text: "Decent service, but prices went up since my last visit." },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={cn("size-4", i <= n ? "fill-star text-star" : "text-border")} />
      ))}
    </div>
  );
}

function Reviews() {
  const [replied, setReplied] = useState<Set<string>>(new Set());
  const reply = (name: string) => {
    setReplied((s) => new Set(s).add(name));
    toast.success(`Automated reply sent to ${name.split(" ")[0]}`);
  };
  return (
    <>
      <PageHeader
        title="Reviews"
        subtitle="4.6 average from 128 Google reviews"
        action={
          <Button variant="outline">
            <Sparkles /> Auto-reply settings
          </Button>
        }
      />
      <div className="space-y-4">
        {reviews.map((r) => (
          <Card key={r.name} className="shadow-card">
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
              <Avatar className="size-10">
                <AvatarFallback className="bg-accent text-accent-foreground font-medium">
                  {r.name.split(" ").map((p) => p[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="font-semibold">{r.name}</p>
                  <Stars n={r.rating} />
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
              </div>
              {replied.has(r.name) ? (
                <Button variant="secondary" disabled className="sm:self-start">Replied</Button>
              ) : (
                <Button onClick={() => reply(r.name)} className="sm:self-start">
                  <Reply /> Reply
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
