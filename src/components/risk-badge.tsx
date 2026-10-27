import { Badge } from "@/components/ui/badge";
import { useTx } from "@/lib/i18n";
import type { Risk } from "@/lib/cases-store";

export function RiskBadge({ risk }: { risk: Risk }) {
  const tx = useTx();
  const map = {
    critical: { v: "danger" as const, l: tx("Crítico", "Critical") },
    high: { v: "warning" as const, l: tx("Alto", "High") },
    routine: { v: "success" as const, l: tx("Rotina", "Routine") },
  }[risk];
  return (
    <Badge variant={map.v} className="gap-1.5">
      <span className="size-1.5 rounded-full bg-current" />
      {map.l}
    </Badge>
  );
}
