"use client";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ExportPDF() {
  async function exportPDF() {
    const res = await fetch("/api/reports");
    const data = await res.json();

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("LOOP AI Feedback Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [[
        "Customer",
        "Sentiment",
        "Priority",
        "Category",
        "Status"
      ]],
      body: data.map((item: any) => [
        item.customer,
        item.sentiment,
        item.priority,
        item.category,
        item.status,
      ]),
    });

    doc.save("loop-ai-report.pdf");
  }

  return (
    <button
      onClick={exportPDF}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
    >
      Export PDF
    </button>
  );
}