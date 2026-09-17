import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { buildContactEmail } from "./template.js";

dotenv.config({
  path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.env"),
});

const PORT = Number(process.env.PORT || 4000);
const MAIL_TO = process.env.MAIL_TO || "info@schoq.com";

function headerSafeName(name) {
  return String(name)
    .replace(/[\r\n"<>]/g, "")
    .trim()
    .slice(0, 120);
}

function fromAddress() {
  const raw = String(process.env.MAIL_FROM || "").trim();
  const bracket = raw.match(/<([^>]+)>/);
  if (bracket?.[1]) return bracket[1].trim();
  if (raw.includes("@")) return raw.replace(/^"|"$/g, "").trim();
  if (process.env.SMTP_USER?.includes("@")) return process.env.SMTP_USER;
  return MAIL_TO;
}

const ALLOWED_ORIGINS = [
  "https://schoq.com",
  "https://www.schoq.com",
  "http://localhost:3000",
];

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "32kb" }));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Origin not allowed by CORS"));
    },
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",
  auth:
    process.env.SMTP_USER && process.env.SMTP_PASS
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      : undefined,
});

function clean(value) {
  return String(value ?? "").trim();
}

function validateContact(body) {
  const name = clean(body.name);
  const company = clean(body.company);
  const phone = clean(body.phone);
  const language = clean(body.language);
  const project = clean(body.project);

  if (!name) return { error: "Name is required." };
  if (!company) return { error: "Company is required." };
  if (!project) return { error: "Project description is required." };
  if (!["en", "de", "en-only"].includes(language)) {
    return { error: "Preferred language is invalid." };
  }
  if (name.length > 120 || company.length > 160 || phone.length > 40) {
    return { error: "One or more fields are too long." };
  }
  if (project.length > 4000) {
    return { error: "Project description is too long." };
  }

  return { data: { name, company, phone, language, project } };
}

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/contact", async (req, res) => {
  const parsed = validateContact(req.body ?? {});
  if (parsed.error) {
    res.status(400).json({ ok: false, error: parsed.error });
    return;
  }

  if (!process.env.SMTP_HOST) {
    res.status(500).json({ ok: false, error: "Mail service is not configured." });
    return;
  }

  try {
    const email = buildContactEmail(parsed.data);
    await transporter.sendMail({
      from: {
        name: headerSafeName(parsed.data.name),
        address: fromAddress(),
      },
      to: MAIL_TO,
      replyTo: MAIL_TO,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });

    res.json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    res.status(500).json({ ok: false, error: "Could not send your message. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`Schoq contact API listening on http://localhost:${PORT}`);
});
