// import { NextRequest } from "next/server";
// import puppeteer from "puppeteer";

// export async function GET(
//   _req: NextRequest,
//   params: { params: Promise<{ id: string }> }
// ) {
//   const id = (await params.params).id;

//   const accessToken = _req.cookies.get("accessToken")?.value;

//   if (!accessToken) {
//     return new Response("Unauthorized", { status: 401 });
//   }

//   // 1️⃣ Preluăm order-ul
//   const url = `${process.env.NEXT_PUBLIC_API}/invoices/pdf/${id}`;

//   if (!url) {
//     return new Response(JSON.stringify({ error: "Order not found" }), {
//       status: 404,
//     });
//   }

//   // 3️⃣ Launch Puppeteer
//   const browser = await puppeteer.launch();
//   const context = browser.defaultBrowserContext();
//   const page = await context.newPage();

//   await page.setExtraHTTPHeaders({
//     Authorization: `Bearer ${accessToken}`,
//   });

//   await context.setCookie({
//     name: "accessToken",
//     value: accessToken,
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "Lax", // or 'strict'
//     path: "/",
//     domain: "localhost",
//   });

//   // 4️⃣ Set HTML content
//   await page.goto(url, { waitUntil: "networkidle0" });

//   // 5️⃣ Generate PDF
//   const pdfBuffer = await page.pdf({
//     format: "A4",
//     printBackground: true,
//   });

//   await browser.close();

//   // 6️⃣ Return PDF response
//   return new Response(Buffer.from(pdfBuffer), {
//     headers: {
//       "Content-Type": "application/pdf",
//       "Content-Disposition": `attachment; filename=invoice-${id}.pdf`,
//     },
//   });
// }

export async function GET() {}
