"use client";

import { API_URL } from "@/shared/config/env";
import { useEffect } from "react";

const DownloadFile = (id: string) => {
  useEffect(() => {
    async function fetchBob() {
      const result = await fetch(`${API_URL}/api/invoices/${id}`);

      if (!result.ok) return;

      const blob = await result.blob();

      const url = URL.createObjectURL(blob);
      return url;
    }
    fetchBob();
  }, [id]);

  return null;
};

export default DownloadFile;
