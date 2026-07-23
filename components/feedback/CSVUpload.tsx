"use client";

import { useState } from "react";
import Papa from "papaparse";

export default function CSVUpload() {
  const [rows, setRows] = useState<any[]>([]);
  const [fileName, setFileName] = useState("");

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete(results) {
        setRows(results.data as any[]);
      },
    });
  }

  async function handleImport() {
    const res = await fetch("/api/feedback/import", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rows }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      setRows([]);
      setFileName("");
    } else {
      alert(data.message);
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">

      {/* Upload Area */}
      <div className="border-2 border-dashed border-blue-300 rounded-2xl bg-blue-50 p-10 text-center">

        <div className="text-6xl mb-4">📄</div>

        <h2 className="text-2xl font-bold text-gray-800">
          Upload CSV File
        </h2>

        <p className="text-gray-500 mt-2">
          Select a CSV file containing customer feedback.
        </p>

        <label
          htmlFor="csvFile"
          className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl cursor-pointer font-semibold transition"
        >
          📂 Choose CSV
        </label>

        <input
          id="csvFile"
          type="file"
          accept=".csv"
          onChange={handleFile}
          className="hidden"
        />

        {fileName && (
          <div className="mt-6 bg-white border rounded-xl p-4 shadow-sm">

            <p className="text-gray-500 text-sm">
              Selected File
            </p>

            <p className="font-semibold text-blue-600 mt-1">
              {fileName}
            </p>

          </div>
        )}
      </div>

      {/* Preview */}

      {rows.length > 0 && (

        <div className="mt-8">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-xl font-bold text-gray-800">
              📋 Preview ({rows.length} rows)
            </h2>

            <button
              onClick={handleImport}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition"
            >
              🚀 Import Feedback
            </button>

          </div>

          <div className="bg-gray-50 border rounded-xl p-4 max-h-96 overflow-auto">

            <pre className="text-sm text-gray-700 whitespace-pre-wrap">
              {JSON.stringify(rows, null, 2)}
            </pre>

          </div>

        </div>

      )}
    </div>
  );
}