import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addCase, type Risk } from "@/lib/cases-store";
import { useTx } from "@/lib/i18n";

const types = ["Violência doméstica", "Negligência", "Evasão escolar", "Trabalho infantil", "Abandono", "Risco cibernético"];
const counselors = ["Ana Costa", "Marcos Lima", "Júlia Rocha", "Paulo Mendes"];

export function NewCaseDialog() {
  const tx = useTx();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ family: "", child: "", age: "", address: "", type: types[0]!, counselor: counselors[0]!, risk: "high" as Risk, description: "" });
  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.family.trim() || !f.child.trim()) {
      toast.error(tx("Preencha família e criança.", "Fill in family and child."));
      return;
    }
    const c = addCase({ family: f.family.trim(), child: f.child.trim(), age: Number(f.age) || 0, address: f.address, type: f.type, counselor: f.counselor, risk: f.risk, status: f.risk === "routine" ? "open" : "urgent", description: f.description });
    toast.success(tx(`Caso #${c.id} criado`, `Case #${c.id} created`));
    setOpen(false);
    navigate({ to: "/case/$caseId", params: { caseId: c.id } });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg"><Plus /> {tx("Novo Caso", "New Case")}</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{tx("Cadastrar novo caso", "Register new case")}</DialogTitle>
          <DialogDescription>{tx("Dados sigilosos — acesso restrito ao conselho.", "Confidential data — council access only.")}</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
          <Field label={tx("Família (sobrenome)", "Family (surname)")}><Input value={f.family} onChange={(e) => set("family")(e.target.value)} /></Field>
          <Field label={tx("Criança / adolescente (iniciais)", "Child / teen (initials)")}><Input value={f.child} onChange={(e) => set("child")(e.target.value)} placeholder="J. S." /></Field>
          <Field label={tx("Idade", "Age")}><Input type="number" min={0} max={17} value={f.age} onChange={(e) => set("age")(e.target.value)} /></Field>
          <Field label={tx("Endereço", "Address")}><Input value={f.address} onChange={(e) => set("address")(e.target.value)} /></Field>
          <Field label={tx("Tipo de violação", "Violation type")}>
            <Select value={f.type} onValueChange={set("type")}><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{types.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select>
          </Field>
          <Field label={tx("Conselheiro(a) responsável", "Assigned counselor")}>
            <Select value={f.counselor} onValueChange={set("counselor")}><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{counselors.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select>
          </Field>
          <Field label={tx("Nível de risco", "Risk level")}>
            <Select value={f.risk} onValueChange={set("risk")}><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="critical">{tx("Crítico", "Critical")}</SelectItem>
                <SelectItem value="high">{tx("Alto", "High")}</SelectItem>
                <SelectItem value="routine">{tx("Rotina", "Routine")}</SelectItem>
              </SelectContent></Select>
          </Field>
          <div className="sm:col-span-2"><Field label={tx("Relato", "Description")}><Textarea rows={4} value={f.description} onChange={(e) => set("description")(e.target.value)} /></Field></div>
          <DialogFooter className="sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>{tx("Cancelar", "Cancel")}</Button>
            <Button type="submit">{tx("Salvar caso", "Save case")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label>{label}</Label>{children}</div>;
}
