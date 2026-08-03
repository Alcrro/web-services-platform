// import { BaseAPI } from "@/infrastructure/api/BaseAPI";

// export class InvoiceAPI extends BaseAPI {
//   protected BASE_PATH = "/api/invoices";

//   async downloadInvoice(id: string): Promise<string> {
//     const result: Response = await this.request(`/${id}`, {}, "blob");
//     console.log(result);

//     const buffer = await result.arrayBuffer();
//     const blob = new Blob([buffer], { type: "application/pdf" });
//     const url = URL.createObjectURL(blob);

//     return url;
//   }
// }
