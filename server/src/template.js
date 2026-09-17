const LANGUAGE_LABELS = {
  en: "English / Deutsch",
  de: "Deutsch",
  "en-only": "English",
};

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fieldRow(label, value) {
  return `
    <tr>
      <td style="padding:12px 0;width:180px;vertical-align:top;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#6B7280;font-weight:700;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:12px 0;font-size:15px;line-height:1.5;color:#1A1B21;">
        ${value}
      </td>
    </tr>
  `;
}

export function buildContactEmail({ name, company, phone, language, project }) {
  const languageLabel = LANGUAGE_LABELS[language] ?? language;
  const submittedAt = new Date().toLocaleString("en-GB", {
    timeZone: "Europe/Berlin",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const subject = `New project inquiry from ${name}${company ? ` · ${company}` : ""}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#F4F7F8;font-family:Inter,Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F4F7F8;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(26,27,33,0.06);">
            <tr>
              <td style="height:6px;background:linear-gradient(90deg,#4A4CE6 0%,#34A1B4 50%,#4BE191 100%);"></td>
            </tr>
            <tr>
              <td style="padding:32px 36px 12px;">
                <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#34A1B4;font-weight:700;">
                  Schoq IT Solutions
                </p>
                <h1 style="margin:0;font-size:24px;line-height:1.3;color:#1A1B21;">
                  New project inquiry
                </h1>
                <p style="margin:10px 0 0;font-size:14px;color:#6B7280;">
                  A visitor submitted the contact form on schoq.com.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 36px 8px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #EEF2F4;border-bottom:1px solid #EEF2F4;">
                  ${fieldRow("Name", escapeHtml(name))}
                  ${fieldRow("Company", escapeHtml(company))}
                  ${fieldRow("Phone", phone ? escapeHtml(phone) : "<span style='color:#9CA3AF;'>Not provided</span>")}
                  ${fieldRow("Preferred language", escapeHtml(languageLabel))}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 36px 8px;">
                <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#6B7280;font-weight:700;">
                  Project description
                </p>
                <div style="padding:16px 18px;background:#F7FBFC;border:1px solid #EEF2F4;border-radius:12px;font-size:15px;line-height:1.7;color:#1A1B21;white-space:pre-wrap;">
                  ${escapeHtml(project)}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 36px 32px;">
                <p style="margin:0;font-size:12px;color:#9CA3AF;">
                  Submitted ${escapeHtml(submittedAt)}
                </p>
              </td>
            </tr>
          </table>
          <p style="margin:20px 0 0;font-size:12px;color:#9CA3AF;">
            This message was sent from the Schoq website contact form.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();

  const text = [
    "New project inquiry from schoq.com",
    "",
    `Name: ${name}`,
    `Company: ${company}`,
    `Phone: ${phone || "Not provided"}`,
    `Preferred language: ${languageLabel}`,
    "",
    "Project description:",
    project,
    "",
    `Submitted: ${submittedAt}`,
  ].join("\n");

  return { subject, html, text };
}
