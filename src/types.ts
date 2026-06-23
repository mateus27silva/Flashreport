/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Campo {
  id: string;
  label: string;
  type: "number" | "text" | "select" | "atividades" | "pendencias";
  meta?: number;
  un?: string;
  opcoes?: string[];
}

export interface Setor {
  id: string;
  label: string;
  icon: string;
  cor: "teal" | "blue" | "amber" | "purple" | "coral" | "green" | "gray" | "pink";
  campos: Campo[];
}

export interface TurnoOption {
  id: "diurno" | "noturno";
  label: string;
  hora: string;
  icon: string;
}

export type StatusType = "ok" | "alerta" | "critico" | "nd";

export const SENHA_SUPERVISOR = "Supervisor0101";

export const TURNOS: TurnoOption[] = [
  { id: "diurno", label: "Diurno", hora: "07:00 → 19:00", icon: "Sun" },
  { id: "noturno", label: "Noturno", hora: "19:00 → 07:00", icon: "Moon" },
];

export const TURMAS = ["A", "B", "C", "D"];

export const SETORES: Setor[] = [
  {
    id: "britagem_primaria",
    label: "Britagem Primária",
    icon: "Hammer",
    cor: "teal",
    campos: [
      { id: "alimentacao", label: "Alimentação", type: "number", meta: 800, un: "t/h" },
      { id: "disponibilidade", label: "Disponibilidade", type: "number", meta: 85, un: "%" },
      { id: "granulometria", label: "Gran. P80", type: "number", meta: 150, un: "mm" },
      { id: "paradas", label: "Paradas", type: "number", meta: 0, un: "min" },
      { id: "ocorrencias", label: "Ocorrências", type: "text" },
      { id: "atividades", label: "Atividades realizadas", type: "atividades" },
      { id: "pendencias", label: "Pendências críticas", type: "pendencias" },
    ],
  },
  {
    id: "rebritagem",
    label: "Rebritagem",
    icon: "Columns",
    cor: "blue",
    campos: [
      { id: "alimentacao", label: "Alimentação", type: "number", meta: 750, un: "t/h" },
      { id: "disponibilidade", label: "Disponibilidade", type: "number", meta: 88, un: "%" },
      { id: "granulometria", label: "Gran. P80", type: "number", meta: 25, un: "mm" },
      { id: "paradas", label: "Paradas", type: "number", meta: 0, un: "min" },
      { id: "ocorrencias", label: "Ocorrências", type: "text" },
      { id: "atividades", label: "Atividades realizadas", type: "atividades" },
      { id: "pendencias", label: "Pendências críticas", type: "pendencias" },
    ],
  },
  {
    id: "patio_silos",
    label: "Pátio e Silos",
    icon: "Warehouse",
    cor: "amber",
    campos: [
      { id: "estoque_patio", label: "Estoque Pátio", type: "number", meta: 5000, un: "t" },
      { id: "nivel_silo1", label: "Nível Silo 1", type: "number", meta: 70, un: "%" },
      { id: "nivel_silo2", label: "Nível Silo 2", type: "number", meta: 70, un: "%" },
      { id: "homogeneizacao", label: "Homogeneização", type: "select", opcoes: ["Sim", "Não", "Parcial"] },
      { id: "ocorrencias", label: "Ocorrências", type: "text" },
      { id: "atividades", label: "Atividades realizadas", type: "atividades" },
      { id: "pendencias", label: "Pendências críticas", type: "pendencias" },
    ],
  },
  {
    id: "moagem",
    label: "Moagem",
    icon: "CircleDot",
    cor: "purple",
    campos: [
      { id: "alimentacao", label: "Alimentação", type: "number", meta: 700, un: "t/h" },
      { id: "granulometria", label: "Gran. P80", type: "number", meta: 210, un: "µm" },
      { id: "densidade_polpa", label: "Dens. Polpa", type: "number", meta: 1450, un: "g/L" },
      { id: "consumo_bolas", label: "Consumo Bolas", type: "number", meta: 0.45, un: "kg/t" },
      { id: "disponibilidade", label: "Disponibilidade", type: "number", meta: 90, un: "%" },
      { id: "paradas", label: "Paradas", type: "number", meta: 0, un: "min" },
      { id: "ocorrencias", label: "Ocorrências", type: "text" },
      { id: "atividades", label: "Atividades realizadas", type: "atividades" },
      { id: "pendencias", label: "Pendências críticas", type: "pendencias" },
    ],
  },
  {
    id: "flotacao",
    label: "Flotação de Cobre",
    icon: "Droplets",
    cor: "coral",
    campos: [
      { id: "teor_alimentacao", label: "Teor Alim. Cu", type: "number", meta: 1.2, un: "%" },
      { id: "teor_concentrado", label: "Teor Conc. Cu", type: "number", meta: 28, un: "%" },
      { id: "recuperacao", label: "Recuperação", type: "number", meta: 88, un: "%" },
      { id: "ph_rougher", label: "pH Rougher", type: "number", meta: 10.5, un: "" },
      { id: "consumo_coletor", label: "Coletor", type: "number", meta: 35, un: "g/t" },
      { id: "consumo_espumante", label: "Espumante", type: "number", meta: 12, un: "g/t" },
      { id: "disponibilidade", label: "Disponibilidade", type: "number", meta: 92, un: "%" },
      { id: "ocorrencias", label: "Ocorrências", type: "text" },
      { id: "atividades", label: "Atividades realizadas", type: "atividades" },
      { id: "pendencias", label: "Pendências críticas", type: "pendencias" },
    ],
  },
  {
    id: "espessamento_conc",
    label: "Espessamento Conc.",
    icon: "Filter",
    cor: "green",
    campos: [
      { id: "densidade_underflow", label: "Dens. Underflow", type: "number", meta: 1650, un: "g/L" },
      { id: "vazao_overflow", label: "Vazão Overflow", type: "number", meta: 120, un: "m³/h" },
      { id: "nivel", label: "Nível", type: "number", meta: 60, un: "%" },
      { id: "consumo_floculante", label: "Floculante", type: "number", meta: 25, un: "g/t" },
      { id: "ocorrencias", label: "Ocorrências", type: "text" },
      { id: "atividades", label: "Atividades realizadas", type: "atividades" },
      { id: "pendencias", label: "Pendências críticas", type: "pendencias" },
    ],
  },
  {
    id: "espessamento_rejeito",
    label: "Espessamento Rejeito",
    icon: "FilterX",
    cor: "gray",
    campos: [
      { id: "densidade_underflow", label: "Dens. Underflow", type: "number", meta: 1400, un: "g/L" },
      { id: "vazao_overflow", label: "Vazão Overflow", type: "number", meta: 800, un: "m³/h" },
      { id: "nivel", label: "Nível", type: "number", meta: 55, un: "%" },
      { id: "consumo_floculante", label: "Floculante", type: "number", meta: 18, un: "g/t" },
      { id: "ocorrencias", label: "Ocorrências", type: "text" },
      { id: "atividades", label: "Atividades realizadas", type: "atividades" },
      { id: "pendencias", label: "Pendências críticas", type: "pendencias" },
    ],
  },
  {
    id: "filtro_prensa",
    label: "Filtro Prensa Conc.",
    icon: "Layers",
    cor: "pink",
    campos: [
      { id: "umidade", label: "Umidade do Bolo", type: "number", meta: 9.5, un: "%" },
      { id: "producao", label: "Produção", type: "number", meta: 280, un: "t/turno" },
      { id: "ciclos", label: "Ciclos", type: "number", meta: 24, un: "" },
      { id: "disponibilidade", label: "Disponibilidade", type: "number", meta: 90, un: "%" },
      { id: "paradas", label: "Paradas", type: "number", meta: 0, un: "min" },
      { id: "ocorrencias", label: "Ocorrências", type: "text" },
      { id: "atividades", label: "Atividades realizadas", type: "atividades" },
      { id: "pendencias", label: "Pendências críticas", type: "pendencias" },
    ],
  },
];

export const COR = {
  teal:   { bg: "bg-[#E1F5EE]", bd: "border-[#0F6E56]", tx: "text-[#085041]", hover: "hover:bg-[#d0f0e4]", textNormal: "#085041", primary: "#0F6E56" },
  blue:   { bg: "bg-[#E6F1FB]", bd: "border-[#185FA5]", tx: "text-[#0C447C]", hover: "hover:bg-[#d3e7f8]", textNormal: "#0C447C", primary: "#185FA5" },
  amber:  { bg: "bg-[#FAEEDA]", bd: "border-[#854F0B]", tx: "text-[#633806]", hover: "hover:bg-[#f6ebd4]", textNormal: "#633806", primary: "#854F0B" },
  purple: { bg: "bg-[#EEEDFE]", bd: "border-[#534AB7]", tx: "text-[#3C3489]", hover: "hover:bg-[#e4e1fc]", textNormal: "#3C3489", primary: "#534AB7" },
  coral:  { bg: "bg-[#FAECE7]", bd: "border-[#993C1D]", tx: "text-[#712B13]", hover: "hover:bg-[#f8ded4]", textNormal: "#712B13", primary: "#993C1D" },
  green:  { bg: "bg-[#EAF3DE]", bd: "border-[#3B6D11]", tx: "text-[#27500A]", hover: "hover:bg-[#dfedce]", textNormal: "#27500A", primary: "#3B6D11" },
  gray:   { bg: "bg-[#F1EFE8]", bd: "border-[#5F5E5A]", tx: "text-[#444441]", hover: "hover:bg-[#e8e4db]", textNormal: "#444441", primary: "#5F5E5A" },
  pink:   { bg: "bg-[#FBEAF0]", bd: "border-[#993556]", tx: "text-[#72243E]", hover: "hover:bg-[#f9d8e5]", textNormal: "#72243E", primary: "#993556" },
};

export function st(val: string | number, meta: number | undefined, id: string): StatusType {
  if (val === "" || val === undefined || val === null || meta === undefined) return "nd";
  const v = parseFloat(val as string);
  const m = parseFloat(meta as any);
  if (isNaN(v)) return "nd";
  if (id === "paradas") {
    return v === 0 ? "ok" : v <= 30 ? "alerta" : "critico";
  }
  const p = (v / m) * 100;
  return p >= 95 ? "ok" : p >= 80 ? "alerta" : "critico";
}

export interface StatusStyle {
  bg: string;
  co: string;
  em: string;
  lb: string;
}

export const ST: Record<StatusType, StatusStyle> = {
  ok:      { bg: "bg-[#EAF3DE]", co: "text-[#27500A]", em: "✅", lb: "OK" },
  alerta:  { bg: "bg-[#FAEEDA]", co: "text-[#633806]", em: "⚠️", lb: "Alerta" },
  critico: { bg: "bg-[#FCEBEB]", co: "text-[#791F1F]", em: "🔴", lb: "Crítico" },
  nd:      { bg: "bg-[#f0f0f0]", co: "text-[#9ca3af]", em: "—", lb: "—" },
};

export function fmtData(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

interface GerarWppParams {
  data: string;
  turno: "diurno" | "noturno";
  turma: string;
  supervisor: string;
  dados: Record<string, Record<string, any>>;
  acoes: string[];
  obs: string;
}

export function gerarWpp({ data, turno, turma, supervisor, dados, acoes, obs }: GerarWppParams): string {
  const tl = turno === "diurno" ? "☀️ Diurno (07h–19h)" : "🌙 Noturno (19h–07h)";
  const hr = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  const L: string[] = [];
  L.push(`🏭 *RELATÓRIO DE TURNO — PLANTA COBRE*`);
  L.push(`📅 ${fmtData(data)} | ${tl}`);
  L.push(`👥 Turma ${turma} | Supervisor: ${supervisor}`);
  L.push(`🕐 Gerado às ${hr}`);
  L.push(``);

  let ok = 0;
  let al = 0;
  let cr = 0;
  let pr = 0;

  SETORES.forEach(s => {
    const d = dados[s.id] || {};
    if (s.campos.some(c => c.type === "number" && d[c.id] !== "" && d[c.id] !== undefined)) pr++;
    s.campos
      .filter(c => c.type === "number" && d[c.id] !== "" && d[c.id] !== undefined)
      .forEach(c => {
        const s2 = st(d[c.id], c.meta, c.id);
        if (s2 === "ok") ok++;
        else if (s2 === "alerta") al++;
        else if (s2 === "critico") cr++;
      });
  });

  L.push(`📊 *RESUMO*`);
  L.push(`✅ OK: ${ok}  ⚠️ Alerta: ${al}  🔴 Crítico: ${cr}`);
  L.push(`📋 Áreas Lançadas: ${pr}/${SETORES.length}`);
  L.push(``);

  const crits: string[] = [];
  SETORES.forEach(s => {
    const d = dados[s.id] || {};
    s.campos
      .filter(c => c.type === "number")
      .forEach(c => {
        if (st(d[c.id], c.meta, c.id) === "critico") {
          crits.push(`  • ${s.label} › ${c.label}: *${d[c.id]} ${c.un}* (meta ${c.meta})`);
        }
      });
  });

  if (crits.length > 0) {
    L.push(`🔴 *PARÂMETROS CRÍTICOS*`);
    crits.forEach(l => L.push(l));
    L.push(``);
  }

  // Pendências críticas consolidadas de todos os setores
  const todasPendencias: string[] = [];
  SETORES.forEach(s => {
    const d = dados[s.id] || {};
    const pend = s.campos.find(c => c.type === "pendencias");
    if (pend) {
      const itens = ((d[pend.id] as string[]) || []).filter(x => x && x.trim());
      itens.forEach(it => todasPendencias.push(`  • *${s.label}:* ${it}`));
    }
  });

  if (todasPendencias.length > 0) {
    L.push(`⚠️ *PENDÊNCIAS CRÍTICAS — TODOS OS SETORES*`);
    todasPendencias.forEach(l => L.push(l));
    L.push(``);
  }

  SETORES.forEach(s => {
    const d = dados[s.id] || {};
    const campos = s.campos.filter(c => {
      if (c.type === "text") return d[c.id] && d[c.id].trim();
      if (c.type === "atividades" || c.type === "pendencias") {
        return Array.isArray(d[c.id]) && d[c.id].some((x: string) => x && x.trim());
      }
      return d[c.id] !== "" && d[c.id] !== undefined;
    });

    if (!campos.length) return;
    L.push(`━━━━━━━━━━━━━━━━━━`);
    L.push(`*${s.label.toUpperCase()}*`);
    campos.forEach(c => {
      if (c.type === "text") {
        L.push(`📝 ${d[c.id]}`);
        return;
      }
      if (c.type === "atividades") {
        const itens = ((d[c.id] as string[]) || []).filter(x => x && x.trim());
        if (!itens.length) return;
        L.push(`✅ *Atividades realizadas:*`);
        itens.forEach((it, i) => L.push(`   ${i + 1}. ${it}`));
        return;
      }
      if (c.type === "pendencias") {
        const itens = ((d[c.id] as string[]) || []).filter(x => x && x.trim());
        if (!itens.length) return;
        L.push(`🔴 *Pendências críticas:*`);
        itens.forEach((it, i) => L.push(`   ${i + 1}. ${it}`));
        return;
      }
      const s2 = st(d[c.id], c.meta, c.id);
      const metaS = c.meta !== undefined ? ` (meta ${c.meta})` : "";
      L.push(`${ST[s2].em} ${c.label}: *${d[c.id]}${c.un ? " " + c.un : ""}*${metaS}`);
    });
    L.push(``);
  });

  const av = acoes.filter(a => a && a.trim());
  if (av.length > 0) {
    L.push(`━━━━━━━━━━━━━━━━━━`);
    L.push(`📌 *AÇÕES — PRÓXIMO TURNO*`);
    av.forEach((a, i) => L.push(`${i + 1}. ${a}`));
    L.push(``);
  }

  if (obs && obs.trim()) {
    L.push(`━━━━━━━━━━━━━━━━━━`);
    L.push(`💬 *COMENTÁRIO*`);
    L.push(obs.trim());
    L.push(``);
  }

  L.push(`_Relatório gerado automaticamente_`);
  return L.join("\n");
}
