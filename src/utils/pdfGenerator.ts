import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { SETORES, OcorrenciaPerdaSeguranca, fmtData } from "../types";

export interface PDFDataPayload {
  data: string;
  turno: string;
  turma: string;
  dados: Record<string, Record<string, any>>;
  ocorrencias: OcorrenciaPerdaSeguranca[];
  acoes: string[];
  obs: string;
}

export function gerarRelatorioPDF(payload: PDFDataPayload) {
  const { data, turno, turma, dados, ocorrencias, acoes, obs } = payload;
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  let currentY = margin;

  // Colors
  const primaryColor: [number, number, number] = [13, 148, 136]; // #0d9488 (Teal)
  const headerBg: [number, number, number] = [15, 23, 42]; // #0f172a (Slate 900)

  // Helper for adding new page with header/footer
  const checkPageBreak = (neededHeight: number) => {
    if (currentY + neededHeight > pageHeight - 18) {
      doc.addPage();
      currentY = margin + 4;
    }
  };

  // --- HEADER BANNER ---
  doc.setFillColor(...headerBg);
  doc.rect(margin, currentY, pageWidth - margin * 2, 24, "F");

  // Accent stripe
  doc.setFillColor(...primaryColor);
  doc.rect(margin, currentY, 4, 24, "F");

  // Title text
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13.5);
  doc.text("PLANTA DE BENEFICIAMENTO DE COBRE", margin + 8, currentY + 9);

  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(203, 213, 225); // Slate 300
  doc.text("RELATÓRIO OPERACIONAL DE PASSAGEM DE TURNO", margin + 8, currentY + 16);

  // Turma badge on header
  doc.setFillColor(30, 41, 59);
  doc.roundedRect(pageWidth - margin - 26, currentY + 5, 22, 14, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("TURMA", pageWidth - margin - 22, currentY + 10);
  doc.setFontSize(11);
  doc.setTextColor(52, 211, 153); // Emerald 400
  doc.text(turma || "-", pageWidth - margin - 17, currentY + 16);

  currentY += 28;

  // --- METADATA STRIP ---
  doc.setFillColor(241, 245, 249); // Slate 100
  doc.roundedRect(margin, currentY, pageWidth - margin * 2, 14, 2, 2, "F");
  doc.setDrawColor(226, 232, 240); // Slate 200
  doc.roundedRect(margin, currentY, pageWidth - margin * 2, 14, 2, 2, "S");

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(71, 85, 105); // Slate 600
  
  const colWidth = (pageWidth - margin * 2) / 3;
  
  // Data
  doc.text("DATA DO TURNO", margin + 4, currentY + 5.5);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text(fmtData(data) || "-", margin + 4, currentY + 10.5);

  // Turno
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(71, 85, 105);
  doc.text("TURNO OPERACIONAL", margin + colWidth + 4, currentY + 5.5);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  const turnoLabel = turno === "diurno" ? "☀️ Diurno (07h - 19h)" : "🌙 Noturno (19h - 07h)";
  doc.text(turnoLabel, margin + colWidth + 4, currentY + 10.5);

  // Gerado em
  const now = new Date();
  const emissoStr = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()} às ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(71, 85, 105);
  doc.text("EMISSÃO DO RELATÓRIO", margin + colWidth * 2 + 4, currentY + 5.5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(emissoStr, margin + colWidth * 2 + 4, currentY + 10.5);

  currentY += 18;

  // --- SEÇÃO 1: SEGURANÇA E MEIO AMBIENTE ---
  checkPageBreak(30);
  doc.setFillColor(...headerBg);
  doc.roundedRect(margin, currentY, pageWidth - margin * 2, 7, 1, 1, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("1. SEGURANÇA, MEIO AMBIENTE E PERDAS DE PROCESSO", margin + 3, currentY + 4.8);

  currentY += 9;

  const validOcs = (ocorrencias || []).filter(
    oc => oc.eventoPrincipal?.trim() || oc.impactosDanos?.trim() || oc.acoesRealizadas?.trim() || oc.linhaDoTempo?.trim() || oc.condicaoRestricoes?.trim()
  );

  if (validOcs.length === 0) {
    doc.setFillColor(236, 253, 245); // Emerald 50
    doc.setDrawColor(167, 243, 208); // Emerald 200
    doc.roundedRect(margin, currentY, pageWidth - margin * 2, 10, 2, 2, "FD");
    doc.setTextColor(6, 95, 70); // Emerald 800
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("✅ Turno Concluído Sem Ocorrências de Segurança, Quase-Acidentes ou Perdas de Processo.", margin + 4, currentY + 6.5);
    currentY += 14;
  } else {
    validOcs.forEach((oc, i) => {
      checkPageBreak(35);
      doc.setFillColor(254, 242, 242); // Red 50
      doc.setDrawColor(254, 202, 202); // Red 200
      
      const ocStartY = currentY;
      doc.setFontSize(8.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(185, 28, 28); // Red 700
      doc.text(`🚨 OCORRÊNCIA #${i + 1}: ${oc.eventoPrincipal || "Ocorrência Crítica Registrada"}`, margin + 3, currentY + 4);
      currentY += 7;

      if (oc.impactosDanos?.trim()) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.setTextColor(153, 27, 27);
        doc.text("• Impactos e Danos:", margin + 4, currentY);
        currentY += 3.8;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(51, 65, 85);
        const splitText = doc.splitTextToSize(oc.impactosDanos.trim(), pageWidth - margin * 2 - 8);
        doc.text(splitText, margin + 6, currentY);
        currentY += splitText.length * 3.5 + 2;
      }

      if (oc.acoesRealizadas?.trim()) {
        checkPageBreak(15);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.setTextColor(153, 27, 27);
        doc.text("• Ações Realizadas:", margin + 4, currentY);
        currentY += 3.8;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(51, 65, 85);
        const splitText = doc.splitTextToSize(oc.acoesRealizadas.trim(), pageWidth - margin * 2 - 8);
        doc.text(splitText, margin + 6, currentY);
        currentY += splitText.length * 3.5 + 2;
      }

      if (oc.linhaDoTempo?.trim()) {
        checkPageBreak(15);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.setTextColor(153, 27, 27);
        doc.text("• Linha do Tempo:", margin + 4, currentY);
        currentY += 3.8;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(51, 65, 85);
        const splitText = doc.splitTextToSize(oc.linhaDoTempo.trim(), pageWidth - margin * 2 - 8);
        doc.text(splitText, margin + 6, currentY);
        currentY += splitText.length * 3.5 + 2;
      }

      if (oc.condicaoRestricoes?.trim()) {
        checkPageBreak(15);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.setTextColor(153, 27, 27);
        doc.text("• Condição Operacional e Restrições Atuais:", margin + 4, currentY);
        currentY += 3.8;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(51, 65, 85);
        const splitText = doc.splitTextToSize(oc.condicaoRestricoes.trim(), pageWidth - margin * 2 - 8);
        doc.text(splitText, margin + 6, currentY);
        currentY += splitText.length * 3.5 + 2;
      }

      // Border outline box for the occurrence
      const boxHeight = currentY - ocStartY + 1;
      doc.roundedRect(margin, ocStartY, pageWidth - margin * 2, boxHeight, 1, 1, "S");
      currentY += 4;
    });
  }

  // --- SEÇÃO 2: DESEMPENHO OPERACIONAL DOS SETORES ---
  checkPageBreak(30);
  doc.setFillColor(...headerBg);
  doc.roundedRect(margin, currentY, pageWidth - margin * 2, 7, 1, 1, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("2. DESEMPENHO OPERACIONAL POR SETOR", margin + 3, currentY + 4.8);

  currentY += 10;

  // Iterate over sectors
  SETORES.forEach((setor, index) => {
    checkPageBreak(35);

    const sDados = dados[setor.id] || {};
    const setorNumber = index + 1;

    // Sector Banner Header
    doc.setFillColor(241, 245, 249); // Slate 100
    doc.setDrawColor(203, 213, 225);
    doc.rect(margin, currentY, pageWidth - margin * 2, 6, "FD");
    
    doc.setFillColor(...primaryColor);
    doc.rect(margin, currentY, 3, 6, "F");

    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(`${setorNumber}. ${setor.label.toUpperCase()}`, margin + 6, currentY + 4.2);

    currentY += 8;

    // Extract regular fields vs list fields (atividades / pendencias)
    const paramRows: Array<[string, string, string, string]> = [];
    let atividadesList: string[] = [];
    let pendenciasList: string[] = [];
    let ocorrenciaText = "";

    setor.campos.forEach(campo => {
      const val = sDados[campo.id];

      if (campo.type === "atividades") {
        if (Array.isArray(val)) {
          atividadesList = val.filter(x => typeof x === "string" && x.trim().length > 0);
        }
      } else if (campo.type === "pendencias") {
        if (Array.isArray(val)) {
          pendenciasList = val.filter(x => typeof x === "string" && x.trim().length > 0);
        }
      } else if (campo.id === "ocorrencias") {
        if (typeof val === "string" && val.trim().length > 0) {
          ocorrenciaText = val.trim();
        }
      } else {
        // Regular number, text, or select
        let displayVal = val !== undefined && val !== null && val !== "" ? `${val}` : "-";
        if (displayVal !== "-" && campo.un) {
          displayVal = `${displayVal} ${campo.un}`;
        }
        
        let metaStr = campo.meta !== undefined ? `${campo.meta}${campo.un ? ` ${campo.un}` : ""}` : "-";
        let status = "-";

        if (campo.meta !== undefined && val !== undefined && val !== "" && !isNaN(Number(val))) {
          const numVal = Number(val);
          if (campo.id === "paradas_manutencao" || campo.id === "paradas_outros") {
            status = numVal === 0 ? "OK (0h)" : `${numVal}h Parada`;
          } else if (numVal >= campo.meta) {
            status = "Atingida";
          } else {
            status = "Abaixo Meta";
          }
        } else if (val !== undefined && val !== "") {
          status = "Apurado";
        }

        paramRows.push([campo.label, displayVal, metaStr, status]);
      }
    });

    // Draw Param Table if rows exist
    if (paramRows.length > 0) {
      autoTable(doc, {
        startY: currentY,
        margin: { left: margin, right: margin },
        head: [["Parâmetro / Indicador", "Valor Realizado", "Meta Referência", "Situação"]],
        body: paramRows,
        theme: "striped",
        headStyles: {
          fillColor: [51, 65, 85], // Slate 700
          textColor: [255, 255, 255],
          fontSize: 7.5,
          fontStyle: "bold",
        },
        styles: {
          fontSize: 7.5,
          cellPadding: 1.6,
          textColor: [30, 41, 59],
        },
        columnStyles: {
          0: { cellWidth: 70, fontStyle: "bold" },
          1: { cellWidth: 40, fontStyle: "bold", halign: "center" },
          2: { cellWidth: 35, halign: "center", textColor: [100, 116, 139] },
          3: { cellWidth: "auto", halign: "center" },
        },
        didParseCell: (dataCell) => {
          if (dataCell.section === "body" && dataCell.column.index === 3) {
            const txt = String(dataCell.cell.raw);
            if (txt === "Atingida" || txt.startsWith("OK")) {
              dataCell.cell.styles.textColor = [16, 185, 129];
              dataCell.cell.styles.fontStyle = "bold";
            } else if (txt === "Abaixo Meta" || txt.includes("Parada")) {
              dataCell.cell.styles.textColor = [220, 38, 38];
              dataCell.cell.styles.fontStyle = "bold";
            }
          }
        }
      });

      currentY = (doc as any).lastAutoTable.finalY + 4;
    }

    // Atividades Realizadas Box
    if (atividadesList.length > 0) {
      checkPageBreak(12 + atividadesList.length * 4);
      doc.setFillColor(240, 253, 244); // Green 50
      doc.setDrawColor(187, 247, 208); // Green 200
      
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(22, 101, 52); // Green 800
      doc.text("✔️ ATIVIDADES REALIZADAS:", margin + 3, currentY + 3.5);
      currentY += 5.5;

      atividadesList.forEach(atv => {
        doc.setFont("helvetica", "normal");
        doc.setTextColor(21, 128, 61);
        doc.setFontSize(7.5);
        const splitText = doc.splitTextToSize(`• ${atv}`, pageWidth - margin * 2 - 8);
        doc.text(splitText, margin + 4, currentY);
        currentY += splitText.length * 3.5;
      });

      currentY += 2;
    }

    // Pendências Críticas Box
    if (pendenciasList.length > 0) {
      checkPageBreak(12 + pendenciasList.length * 4);
      doc.setFillColor(255, 247, 237); // Orange 50
      doc.setDrawColor(254, 215, 170); // Orange 200

      doc.setFontSize(7.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(154, 52, 18); // Orange 800
      doc.text("🔴 PENDÊNCIAS CRÍTICAS / ACOMPANHAMENTO:", margin + 3, currentY + 3.5);
      currentY += 5.5;

      pendenciasList.forEach(pend => {
        doc.setFont("helvetica", "normal");
        doc.setTextColor(194, 65, 12);
        doc.setFontSize(7.5);
        const splitText = doc.splitTextToSize(`• ${pend}`, pageWidth - margin * 2 - 8);
        doc.text(splitText, margin + 4, currentY);
        currentY += splitText.length * 3.5;
      });

      currentY += 2;
    }

    // Ocorrências do Setor (se houver texto)
    if (ocorrenciaText) {
      checkPageBreak(10);
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(100, 116, 139);
      doc.text("Observações do Setor:", margin + 2, currentY + 3);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 65, 85);
      const splitText = doc.splitTextToSize(ocorrenciaText, pageWidth - margin * 2 - 4);
      doc.text(splitText, margin + 2, currentY + 7);
      currentY += 8 + splitText.length * 3.5;
    }

    currentY += 4;
  });

  // --- SEÇÃO 3: AÇÕES OPERATIVAS PARA O PRÓXIMO TURNO ---
  const acoesValidas = (acoes || []).filter(a => a && a.trim().length > 0);
  if (acoesValidas.length > 0) {
    checkPageBreak(25 + acoesValidas.length * 5);
    doc.setFillColor(...headerBg);
    doc.roundedRect(margin, currentY, pageWidth - margin * 2, 7, 1, 1, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("3. AÇÕES OPERATIVAS PARA O PRÓXIMO TURNO", margin + 3, currentY + 4.8);

    currentY += 9;

    acoesValidas.forEach((acao, i) => {
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, currentY, pageWidth - margin * 2, 7, 1, 1, "FD");

      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...primaryColor);
      doc.text(`[AÇÃO ${i + 1}]`, margin + 3, currentY + 4.8);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(15, 23, 42);
      const splitText = doc.splitTextToSize(acao, pageWidth - margin * 2 - 25);
      doc.text(splitText, margin + 22, currentY + 4.8);

      currentY += 8.5;
    });

    currentY += 3;
  }

  // --- SEÇÃO 4: COMENTÁRIOS E OBSERVAÇÕES GERAIS ---
  if (obs && obs.trim().length > 0) {
    checkPageBreak(25);
    doc.setFillColor(...headerBg);
    doc.roundedRect(margin, currentY, pageWidth - margin * 2, 7, 1, 1, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("4. COMENTÁRIOS OPERACIONAIS E DIRETRIZES GERAIS", margin + 3, currentY + 4.8);

    currentY += 9;

    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    
    const splitObs = doc.splitTextToSize(obs.trim(), pageWidth - margin * 2 - 8);
    const boxH = Math.max(12, splitObs.length * 4 + 6);
    
    doc.roundedRect(margin, currentY, pageWidth - margin * 2, boxH, 1, 1, "FD");
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(30, 41, 59);
    doc.text(splitObs, margin + 4, currentY + 5);

    currentY += boxH + 6;
  }

  // --- RODAPÉ EM TODAS AS PÁGINAS ---
  const totalPages = (doc.internal as any).getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    
    // Top subtle bar on subsequent pages
    if (i > 1) {
      doc.setFillColor(241, 245, 249);
      doc.rect(margin, 8, pageWidth - margin * 2, 5, "F");
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(100, 116, 139);
      doc.text(`RELATÓRIO DE TURNO · TURMA ${turma || "-"} · ${fmtData(data)} (${turno === "diurno" ? "DIURNO" : "NOTURNO"})`, margin + 2, 11.5);
    }

    // Bottom footer line
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(148, 163, 184); // Slate 400
    doc.text("Planta de Beneficiamento de Cobre · Sistema de Relatório de Turno", margin, pageHeight - 7.5);

    const pageStr = `Página ${i} de ${totalPages}`;
    doc.text(pageStr, pageWidth - margin - doc.getTextWidth(pageStr), pageHeight - 7.5);
  }

  // Save the PDF file with a clean timestamped filename
  const cleanDate = (data || "turno").replace(/[^a-zA-Z0-9_-]/g, "_");
  const fileName = `Relatorio_Turno_${turma || "A"}_${turno || "diurno"}_${cleanDate}.pdf`;
  doc.save(fileName);
}
