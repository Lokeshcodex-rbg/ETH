const http = require("http");
const fs = require("fs/promises");
const path = require("path");
const {
  answerFor,
  getDashboard,
  ingestDocument,
  searchDocuments,
  state,
} = require("./data-store");

const root = path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 4180);
const host = process.env.HOST || "127.0.0.1";

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
};

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  });
  res.end(JSON.stringify(payload));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 2_000_000) {
        reject(new Error("Payload too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(new Error("Body must be valid JSON"));
      }
    });
    req.on("error", reject);
  });
}

function withTelemetry(payload) {
  return {
    ok: true,
    servedBy: "OpsBrain local backend",
    generatedAt: new Date().toISOString(),
    ...payload,
  };
}

async function handleApi(req, res, url) {
  if (req.method === "OPTIONS") return sendJson(res, 204, {});

  if (url.pathname === "/api/health" && req.method === "GET") {
    return sendJson(
      res,
      200,
      withTelemetry({
        status: "online",
        indexedDocuments: state.documents.length,
        graphLinks: state.relationships.length,
        agents: ["copilot", "maintenance-rca", "compliance", "lessons-learned"],
      }),
    );
  }

  if (url.pathname === "/api/dashboard" && req.method === "GET") {
    return sendJson(res, 200, withTelemetry(getDashboard()));
  }

  if (url.pathname === "/api/documents" && req.method === "GET") {
    return sendJson(res, 200, withTelemetry({ documents: state.documents }));
  }

  if (url.pathname === "/api/graph" && req.method === "GET") {
    return sendJson(res, 200, withTelemetry({ relationships: state.relationships }));
  }

  if (url.pathname === "/api/search" && req.method === "GET") {
    const q = url.searchParams.get("q") || "";
    return sendJson(res, 200, withTelemetry({ query: q, results: searchDocuments(q) }));
  }

  if (url.pathname === "/api/query" && req.method === "POST") {
    const body = await parseBody(req);
    const query = body.query || "";
    const answer = answerFor(query);
    return sendJson(
      res,
      200,
      withTelemetry({
        query,
        answer,
        retrievedDocuments: searchDocuments(query).slice(0, 4),
      }),
    );
  }

  if (url.pathname === "/api/ingest" && req.method === "POST") {
    const body = await parseBody(req);
    const document = ingestDocument(body);
    return sendJson(
      res,
      201,
      withTelemetry({
        document,
        indexedDocuments: state.documents.length,
        graphLinks: state.relationships.length,
      }),
    );
  }

  if (url.pathname === "/api/maintenance/rca" && req.method === "GET") {
    return sendJson(res, 200, withTelemetry({ recommendations: state.maintenanceAgents }));
  }

  if (url.pathname === "/api/compliance/gaps" && req.method === "GET") {
    return sendJson(res, 200, withTelemetry({ checks: state.complianceItems, evidencePack: state.evidencePack }));
  }

  if (url.pathname === "/api/lessons" && req.method === "GET") {
    return sendJson(res, 200, withTelemetry({ lessons: state.lessons }));
  }

  return sendJson(res, 404, { ok: false, error: "API route not found" });
}

async function serveStatic(res, url) {
  const requested = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const normalized = path.normalize(requested).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(root, normalized);

  if (!filePath.startsWith(root)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Forbidden");
  }

  try {
    const data = await fs.readFile(filePath);
    res.writeHead(200, { "Content-Type": mime[path.extname(filePath).toLowerCase()] || "application/octet-stream" });
    res.end(data);
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || `${host}:${port}`}`);
    if (url.pathname.startsWith("/api/")) return await handleApi(req, res, url);
    return await serveStatic(res, url);
  } catch (error) {
    sendJson(res, 500, { ok: false, error: error.message });
  }
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use. Set a different port with: PORT=4182 npm start`);
    process.exit(1);
  }
  throw error;
});

server.listen(port, host, () => {
  console.log(`OpsBrain backend running at http://${host}:${port}`);
  console.log(`Open http://${host}:${port}/index.html`);
});
