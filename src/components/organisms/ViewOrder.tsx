"use client";

import { API_URL } from "@/shared/config/env";
import { useEffect, useState } from "react";

const ViewOrder = ({ id }: { id: string }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let canceled = false;
    let url: string | null = null;

    const fetchPdf = async () => {
      try {
        const res = await fetch(`${API_URL}/api/invoices/${id}`);
        if (!res.ok) throw new Error("Failed to fetch PDF");
        const blob = await res.blob();
        url = URL.createObjectURL(blob);
        if (!canceled) setPdfUrl(url);
      } catch {
        if (!canceled) setError(true);
      }
    };

    fetchPdf();

    return () => {
      canceled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, [id]);

  if (error) return <p>Failed to load PDF</p>;
  if (!pdfUrl) return <p>Loading PDF preview...</p>;

  return (
    <div>
      <h2>Preview Factură Order #{id}</h2>
      <div className="border border-gray-300 h-[600px]">
        <iframe
          src={pdfUrl}
          width="100%"
          height="100%"
          className="border-none"
        />
      </div>
      <a
        href={pdfUrl}
        download={`invoice-${id}.pdf`}
        className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded"
      >
        Descarcă Factura
      </a>
    </div>
  );
};

export default ViewOrder;
