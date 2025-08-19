import { useCallback } from "react";
import html2pdf from "html2pdf.js";

export function usePdfGenerator() {
  const gerarPDF = useCallback((elementId: string, filename: string) => {
    const element = document.getElementById(elementId);
    if (!element) return alert("Erro: Elemento não encontrado.");

    const opt = {
      margin: 0.5,
      filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .catch((err) => {
        console.error("Erro ao gerar PDF:", err);
        alert("Houve um erro ao gerar o PDF. Tente novamente.");
      });
  }, []);

  const gerarPDFAssinatura = useCallback(
    (elementId: string, filename: string, btnId?: string) => {
      const element = document.getElementById(elementId);
      const btn = btnId ? document.getElementById(btnId) : null;

      if (!element) return alert("Erro: Elemento não encontrado.");
      if (btn) btn.style.display = "none";

      element.classList.add("modo-pdf");
      const rect = element.getBoundingClientRect();
      const widthIn = rect.width / 96;
      const heightIn = rect.height / 96;

      const opt: any = {
        margin: 0,
        filename,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: {
          unit: "in",
          format: [widthIn, heightIn],
          orientation: widthIn > heightIn ? "landscape" : "portrait",
        },
      };

      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .finally(() => {
          element.classList.remove("modo-pdf");
          if (btn) btn.style.display = "flex";
        });
    },
    []
  );

  return { gerarPDF, gerarPDFAssinatura };
}
