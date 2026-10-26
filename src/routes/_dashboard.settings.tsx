import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { PageHeader } from "@/components/app-header";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/_dashboard/settings")({
  head: () => ({
    meta: [
      { title: "Configurações — Protege" },
      { name: "description", content: "Configure automações e notificações do conselho." },
      { property: "og:title", content: "Configurações — Protege" },
      { property: "og:description", content: "Configure automações e notificações do conselho." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHeader title={t.settings.title} subtitle={t.settings.sub} />
      <Card className="shadow-card">
        <CardHeader><CardTitle>{t.settings.card}</CardTitle><CardDescription>{t.settings.cardSub}</CardDescription></CardHeader>
        <CardContent className="space-y-5">
          {t.settings.opts.map(([title, d], i) => (
            <div key={i} className="flex items-center justify-between gap-4">
              <div><p className="font-medium">{title}</p><p className="text-sm text-muted-foreground">{d}</p></div>
              <Switch defaultChecked />
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
