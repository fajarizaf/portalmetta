import nodemailer from "nodemailer";
import puppeteer from "puppeteer";

function envInt(name: string, fallback: number): number {
  const v = process.env[name];
  const n = v != null ? Number(v) : NaN;
  return Number.isFinite(n) ? n : fallback;
}

function envBool(name: string, fallback: boolean): boolean {
  const v = String(process.env[name] ?? "").trim().toLowerCase();
  if (!v) return fallback;
  if (["1", "true", "yes", "y", "on"].includes(v)) return true;
  if (["0", "false", "no", "n", "off"].includes(v)) return false;
  return fallback;
}

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "mail.mettadc.id",
  port: envInt("SMTP_PORT", 465),
  secure: envBool("SMTP_SECURE", true),
  auth: {
    user: process.env.SMTP_USER || "no-reply@mettadc.id",
    pass: process.env.SMTP_PASS || "W3lk0m.2025",
  },
  tls: {
    rejectUnauthorized: envBool("SMTP_REJECT_UNAUTHORIZED", false),
  },
});

export async function sendPasswordResetEmail(email: string, name: string, password: string) {
  const mailOptions = {
    from: '"MettaDC No-Reply" <no-reply@mettadc.id>',
    to: email,
    subject: "Password Reset - MettaDC Customer Portal",
    html: `
      <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #007bff; text-align: center;">Password Reset mettaDC</h2>
        <p>Halo <strong>${name}</strong>,</p>
        <p>Administrator telah memperbarui kata sandi Anda untuk akses ke <strong>MettaDC Customer Portal</strong>.</p>
        <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 5px solid #007bff;">
          <p style="margin: 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 0;"><strong>Password Baru:</strong> <span style="color: #d9534f; font-weight: bold;">${password}</span></p>
        </div>
        <p>Kami sangat menyarankan Anda untuk segera mengganti kata sandi ini setelah masuk untuk alasan keamanan.</p>
        <p style="text-align: center; margin-top: 30px;">
          <a href="https://portal.mettadc.id" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Login ke Portal</a>
        </p>
        <hr style="margin-top: 40px; border: 0; border-top: 1px solid #eee;">
        <p style="font-size: 0.8em; color: #777; text-align: center;">
          Email ini dikirim secara otomatis oleh sistem MettaDC. Mohon tidak membalas email ini.
        </p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}

export async function sendResetPasswordLinkEmail(email: string, name: string, token: string) {
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;
  
  const mailOptions = {
    from: '"MettaDC Support" <no-reply@mettadc.id>',
    to: email,
    subject: "Reset Your Password - MettaDC",
    html: `
      <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #007bff; text-align: center;">Permintaan Reset Password</h2>
        <p>Halo <strong>${name}</strong>,</p>
        <p>Kami menerima permintaan untuk mereset kata sandi akun MettaDC Anda. Klik tombol di bawah ini untuk mengatur kata sandi baru:</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background: #007bff; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password Sekarang</a>
        </p>
        <p>Tautan ini akan kedaluwarsa dalam 1 jam. Jika Anda tidak merasa melakukan permintaan ini, silakan abaikan email ini.</p>
        <hr style="margin-top: 40px; border: 0; border-top: 1px solid #eee;">
        <p style="font-size: 0.8em; color: #777; text-align: center;">
          MettaDC Data Center Services<br/>
          Jl. Jababeka XVII No. 1, Cikarang
        </p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}

export async function sendDocumentEmail(
  toEmail: string,
  docTypeName: string,
  docCode: string | null,
  docStatus: string | null,
  docData: Record<string, unknown>,
  fields: Array<{ key: string; label: string; type: string }>,
  recipientName?: string,
  notes?: string,
  attachments?: Array<{ filename: string; content: Buffer }>
) {
  const formatValue = (value: unknown, type: string): string => {
    if (value === null || value === undefined) return "-";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (type === "PRICE" || type === "CURRENCY" || type === "NUMBER") {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(value));
    }
    if (type === "DATE") {
      try {
        return new Date(String(value)).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
      } catch { return String(value); }
    }
    if (Array.isArray(value)) return value.map(v => String(v)).join(", ");
    return String(value);
  };

  const rowsHtml = fields
    .filter(f => !["ATTACHMENT", "IMAGE"].includes(f.type))
    .map(f => {
      const value = docData[f.key];
      const displayValue = formatValue(value, f.type);
      return `
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background: #f9f9f9; width: 35%;">${f.label}</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${displayValue}</td>
        </tr>
      `;
    })
    .join("");

  const mailOptions = {
    from: `"MettaDC Documents" <no-reply@mettadc.id>`,
    to: toEmail,
    subject: `${docTypeName} - ${docCode ?? "Document"}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #007bff; margin-bottom: 5px;">${docTypeName}</h2>
          <p style="margin: 0; color: #666; font-size: 14px;">Dokumen dari MettaDC</p>
        </div>

        <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 5px; font-weight: bold; width: 40%;">Kode Dokumen</td>
              <td style="padding: 5px;">${docCode ?? "-"}</td>
            </tr>
            <tr>
              <td style="padding: 5px; font-weight: bold;">Status</td>
              <td style="padding: 5px;"><span style="background: ${docStatus?.toLowerCase().includes("approve") || docStatus?.toLowerCase().includes("active") ? "#28a745" : "#6c757d"}; color: white; padding: 2px 8px; border-radius: 3px; font-size: 12px;">${docStatus ?? "-"}</span></td>
            </tr>
            <tr>
              <td style="padding: 5px; font-weight: bold;">Tanggal</td>
              <td style="padding: 5px;">${new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</td>
            </tr>
            ${recipientName ? `
            <tr>
              <td style="padding: 5px; font-weight: bold;">Dikirimkan Kepada</td>
              <td style="padding: 5px;">${recipientName}</td>
            </tr>
            ` : ""}
          </table>
        </div>

        <h3 style="border-bottom: 2px solid #007bff; padding-bottom: 10px; margin-bottom: 20px;">Detail Dokumen</h3>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          ${rowsHtml}
        </table>

        ${notes ? `
        <div style="background: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107;">
          <strong>Catatan:</strong><br/>
          ${notes}
        </div>
        ` : ""}

        <hr style="margin-top: 40px; border: 0; border-top: 1px solid #eee;">
        <p style="font-size: 0.8em; color: #777; text-align: center;">
          Email ini dikirim secara otomatis oleh sistem MettaDC.<br/>
          Dokumen ini dapat diakses melalui portal MettaDC.
        </p>
      </div>
    `,
    attachments: attachments
  };

  return transporter.sendMail(mailOptions);
}

export async function generatePDFFromHTML(html: string): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "20mm", right: "20mm", bottom: "20mm", left: "20mm" },
  });
  await browser.close();
  return Buffer.from(pdf);
}

export async function sendVisitorPassEmail(params: {
  toEmail: string;
  customerName: string;
  recordCode: string | null;
  visitDate: string;
  purpose: string;
  qrDataUrl: string;
  visitors: Array<{ visitor_name: string; nik: string; phone_number?: string; email?: string }>;
}) {
  const { toEmail, customerName, recordCode, visitDate, purpose, qrDataUrl, visitors } = params;

  const visitorRows = visitors.map((v, i) => `
    <tr>
      <td style="padding: 8px 10px; border: 1px solid #ddd; background: #f9f9f9;">${i + 1}</td>
      <td style="padding: 8px 10px; border: 1px solid #ddd;">${v.visitor_name}</td>
      <td style="padding: 8px 10px; border: 1px solid #ddd;">${v.nik}</td>
      <td style="padding: 8px 10px; border: 1px solid #ddd;">${v.phone_number || "-"}</td>
    </tr>
  `).join("");

  const html = `
    <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 650px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 25px;">
        <h2 style="color: #007bff; margin-bottom: 5px;">Visitor Pass - Approved</h2>
        <p style="margin: 0; color: #666; font-size: 14px;">MettaDC Visitor Management</p>
      </div>

      <p>Halo <strong>${customerName}</strong>,</p>
      <p>Visitor request Anda telah <strong style="color: #28a745;">di-approve</strong>. Berikut adalah QR Code Visitor Pass yang dapat Anda tampilkan saat datang ke lokasi:</p>

      <div style="text-align: center; margin: 30px 0; padding: 25px; background: #f8f9fa; border-radius: 12px; border: 2px dashed #dee2e6;">
        <p style="margin: 0 0 10px 0; font-weight: bold; color: #495057; font-size: 14px;">QR Visitor Pass</p>
        <img src="${qrDataUrl}" alt="QR Code Visitor Pass" style="width: 220px; height: 220px; border: 4px solid white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />
        <p style="margin: 10px 0 0 0; font-size: 12px; color: #6c757d;">Tunjukkan QR ini ke petugas security saat datang</p>
      </div>

      <h3 style="border-bottom: 2px solid #007bff; padding-bottom: 8px; margin-bottom: 15px; font-size: 16px;">Detail Kunjungan</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 10px; border: 1px solid #ddd; font-weight: bold; background: #f9f9f9; width: 35%;">Kode</td>
          <td style="padding: 8px 10px; border: 1px solid #ddd;">${recordCode || "-"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 10px; border: 1px solid #ddd; font-weight: bold; background: #f9f9f9;">Tanggal Kunjungan</td>
          <td style="padding: 8px 10px; border: 1px solid #ddd;">${visitDate}</td>
        </tr>
        <tr>
          <td style="padding: 8px 10px; border: 1px solid #ddd; font-weight: bold; background: #f9f9f9;">Keperluan</td>
          <td style="padding: 8px 10px; border: 1px solid #ddd;">${purpose}</td>
        </tr>
      </table>

      ${visitors.length > 0 ? `
      <h3 style="border-bottom: 2px solid #007bff; padding-bottom: 8px; margin-bottom: 15px; font-size: 16px;">Daftar Visitor</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background: #007bff; color: white;">
            <th style="padding: 8px 10px; border: 1px solid #ddd; width: 40px;">#</th>
            <th style="padding: 8px 10px; border: 1px solid #ddd;">Nama</th>
            <th style="padding: 8px 10px; border: 1px solid #ddd;">NIK</th>
            <th style="padding: 8px 10px; border: 1px solid #ddd;">No. HP</th>
          </tr>
        </thead>
        <tbody>
          ${visitorRows}
        </tbody>
      </table>
      ` : ""}

      <div style="background: #d4edda; padding: 15px; border-radius: 5px; border-left: 4px solid #28a745; margin-bottom: 20px;">
        <strong style="color: #155724;">Catatan Penting:</strong><br/>
        <ul style="margin: 5px 0 0 0; padding-left: 20px; color: #155724;">
          <li>QR Code berlaku selama 24 jam sejak diterbitkan</li>
          <li>Tunjukkan QR Code ini ke petugas security saat datang</li>
          <li>Harap datang sesuai tanggal kunjungan yang terdaftar</li>
        </ul>
      </div>

      <hr style="margin-top: 30px; border: 0; border-top: 1px solid #eee;">
      <p style="font-size: 0.8em; color: #777; text-align: center;">
        Email ini dikirim secara otomatis oleh sistem MettaDC.<br/>
        Kunjungan dapat dikelola melalui portal MettaDC.
      </p>
    </div>
  `;

  return transporter.sendMail({
    from: '"MettaDC Visitor Pass" <no-reply@mettadc.id>',
    to: toEmail,
    subject: `Visitor Pass Disetujui - ${recordCode || "Visitor Request"}`,
    html,
  });
}
