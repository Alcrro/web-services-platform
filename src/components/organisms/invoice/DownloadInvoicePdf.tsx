// "use client";
// import { downloadFileApi } from "@/services/api/orders/invoiceApi";
// import DownloadButton from "../../atoms/buttons/DownloadButton";

// const DownloadInvoicePdf = ({ id }: { id: string }) => {
//   async function handleDownload() {
//     const url = await downloadFileApi(id);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `invoice-${id}.pdf`;
//     a.click();
//     URL.revokeObjectURL(url);
//   }
//   return <DownloadButton actionHandle={handleDownload} />;
// };

// export default DownloadInvoicePdf;
