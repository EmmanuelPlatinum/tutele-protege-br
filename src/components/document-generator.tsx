import { useState } from "react";
import { toast } from "sonner";
import { FileSignature, Gavel, Mail, Printer, School, Scale, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { addTimeline, type Case } from "@/lib/cases-store";
import { useTx } from "@/lib/i18n";

const templates = [
  { key: "mp", name: "Ministério Público", icon: Scale, to: "Excelentíssimo(a) Senhor(a) Promotor(a) de Justiça da Infância e Juventude", ask: "a adoção das medidas judiciais cabíveis, nos termos do art. 136, IV, do ECA" },
  { key: "school", name: "Escola", icon: School, to: "Ilustríssimo(a) Senhor(a) Diretor(a) da Unidade Escolar", ask: "informações sobre frequência e rendimento escolar do(a) aluno(a), nos termos do art. 136, III, b, do ECA" },
  { key: "court", name: "Vara da Infância", icon: Gavel, to: "Excelentíssimo(a) Senhor(a) Juiz(a) de Direito da Vara da Infância e Juventude", ask: "a apreciação do caso e a aplicação das medidas de proteção previstas no art. 101 do ECA" },
] as const;

export function DocumentGenerator({ c }: { c: Case }) {
  const tx = useTx();
  const [open, setOpen] = useState(false);
  const [tpl, setTpl] = useState<(typeof templates)[number] | null>(null);
  const today = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  const num = `${String(Number(c.id) % 1000).padStart(3, "0")}/2026`;

  const finish = (how: "print" | "email") => {
    addTimeline(c.id, `Ofício ${num} gerado`, `Destinatário: ${tpl!.name} (${how === "print" ? "impresso" : "enviado por e-mail"}).`);
    if (how === "print") window.print();
    toast.success(how === "print" ? tx("Ofício enviado para impressão", "Document sent to print") : tx("Ofício enviado por e-mail", "Document emailed"));
    setOpen(false);
    setTpl(null);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setTpl(null); }}>
      <DialogTrigger asChild><Button size="lg"><FileSignature /> Gerar Ofício</Button></DialogTrigger>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{tpl ? tx("Pré-visualização do ofício", "Document preview") : tx("Escolha o modelo", "Choose a template")}</DialogTitle>
          <DialogDescription>{tx(`Caso #${c.id} — Família ${c.family}`, `Case #${c.id} — ${c.family} Family`)}</DialogDescription>
        </DialogHeader>
        {!tpl ? (
          <div className="grid gap-3 sm:grid-cols-3">
            {templates.map((t) => (
              <button key={t.key} onClick={() => setTpl(t)} className="rounded-xl border bg-card p-5 text-left transition hover:border-primary hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground"><t.icon className="size-5" /></div>
                <p className="mt-4 font-semibold">{t.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{tx("Modelo oficial conforme o ECA", "Official ECA template")}</p>
              </button>
            ))}
          </div>
        ) : (
          <>
            <div className="rounded-lg border bg-muted/50 p-3 sm:p-6">
              <article className="mx-auto max-w-[620px] space-y-4 rounded-sm bg-card p-6 font-serif text-sm leading-relaxed shadow-card sm:p-10">
                <header className="border-b pb-4 text-center">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">República Federativa do Brasil</p>
                  <p className="mt-1 text-base font-bold">CONSELHO TUTELAR MUNICIPAL</p>
                  <p className="text-xs text-muted-foreground">Rua da Cidadania, 100 — Centro · (65) 3000-0000</p>
                </header>
                <div className="flex justify-between text-xs"><span className="font-bold">OFÍCIO Nº {num}</span><span>{today}</span></div>
                <p>{tpl.to},</p>
                <p>O Conselho Tutelar, no uso das atribuições conferidas pela Lei nº 8.069/1990 (Estatuto da Criança e do Adolescente), vem respeitosamente comunicar a situação acompanhada no <b>Caso #{c.id}</b>, referente à criança/adolescente <b>{c.child}</b>, {c.age} anos, da família {c.family}, envolvendo <b>{c.type.toLowerCase()}</b>.</p>
                <p>{c.description}</p>
                <p>Diante do exposto, solicitamos {tpl.ask}, no prazo de 10 (dez) dias.</p>
                <p>Sem mais, renovamos protestos de elevada estima e consideração.</p>
                <div className="pt-8 text-center">
                  <div className="mx-auto w-56 border-t pt-1">{c.counselor}</div>
                  <p className="text-xs text-muted-foreground">Conselheiro(a) Tutelar</p>
                </div>
                <p className="border-t pt-3 text-center text-[10px] uppercase tracking-wider text-muted-foreground">Documento sigiloso — art. 17 e 143 do ECA</p>
              </article>
            </div>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
              <Button variant="ghost" onClick={() => setTpl(null)}><ArrowLeft /> {tx("Trocar modelo", "Change template")}</Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => finish("email")}><Mail /> {tx("Enviar por e-mail", "Email")}</Button>
                <Button onClick={() => finish("print")}><Printer /> {tx("Imprimir", "Print")}</Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
