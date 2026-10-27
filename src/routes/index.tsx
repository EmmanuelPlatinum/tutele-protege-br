import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FolderLock, FileSignature, CalendarClock, ShieldCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Protege — Gestão para Conselhos Tutelares" },
      { name: "description", content: "Gestão inteligente e segura de casos, ofícios e plantões para Conselhos Tutelares." },
      { property: "og:title", content: "Protege — Gestão para Conselhos Tutelares" },
      { property: "og:description", content: "Gestão inteligente e segura de casos, ofícios e plantões para Conselhos Tutelares." },
    ],
  }),
  component: Landing,
});

const featureIcons = [FolderLock, FileSignature, CalendarClock];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-semibold">
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <ShieldCheck className="size-4" />
      </span>
      Protege
    </Link>
  );
}

function DashboardMock() {
  const { t } = useI18n();
  const bars = [52, 34, 64, 46, 80, 30, 24];
  return (
    <div className="rounded-2xl border bg-card p-2 shadow-glow">
      <div className="flex items-center gap-1.5 px-3 py-2">
        <span className="size-2.5 rounded-full bg-destructive/60" />
        <span className="size-2.5 rounded-full bg-warning/60" />
        <span className="size-2.5 rounded-full bg-success/60" />
      </div>
      <div className="grid gap-3 rounded-xl bg-muted/60 p-4 md:grid-cols-[160px_1fr]">
        <div className="hidden space-y-2 rounded-lg bg-card p-3 md:block">
          {[t.nav.dashboard, t.nav.cases, t.nav.shifts, t.nav.reports].map((n, i) => (
            <div key={n} className={i === 0 ? "rounded-md bg-accent px-2 py-1.5 text-xs font-medium text-accent-foreground" : "px-2 py-1.5 text-xs text-muted-foreground"}>{n}</div>
          ))}
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["42", "8", "95%", "17"].map((v, i) => (
              <div key={i} className="rounded-lg bg-card p-3">
                <p className="text-[11px] text-muted-foreground">{t.landing.mock[i]}</p>
                <p className="text-lg font-semibold">{v}</p>
              </div>
            ))}
          </div>
          <div className="flex h-40 items-end gap-2 rounded-lg bg-card p-4">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md bg-primary/80" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Landing() {
  const { t } = useI18n();
  const L = t.landing;
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <Logo />
          <div className="flex items-center gap-1 sm:gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Button asChild variant="ghost" className="hidden sm:inline-flex"><Link to="/dashboard">{L.login}</Link></Button>
            <Button asChild><Link to="/dashboard">{L.go}</Link></Button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-20 text-center md:px-6 md:pt-28">
        <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="size-1.5 rounded-full bg-primary" /> {L.badge}
        </span>
        <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {L.hero} <span className="text-primary">{L.heroHi}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">{L.sub}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-12 px-6 text-base"><Link to="/dashboard">{L.cta} <ArrowRight /></Link></Button>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground"><Lock className="size-4 text-success" /> {L.note}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {L.features.map(([title, text], i) => {
            const Icon = featureIcons[i]!;
            return (
              <Card key={i} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground"><Icon className="size-5" /></div>
                  <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 md:px-6">
        <DashboardMock />
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row md:px-6">
          <Logo />
          <p>© {new Date().getFullYear()} Protege. {L.rights}</p>
        </div>
      </footer>
    </div>
  );
}
