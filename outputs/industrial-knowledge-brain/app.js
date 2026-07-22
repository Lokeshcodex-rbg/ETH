let documents = [
  {
    id: "PID-204-REV-C",
    title: "P&ID Cooling Water Loop CW-17",
    type: "Engineering Drawing",
    source: "Engineering Vault",
    confidence: 94,
    summary: "Shows pump P-204, exchanger HX-17, line CW-17A, bypass valve XV-17, and pressure indicator PI-204.",
    entities: ["P-204", "HX-17", "CW-17A", "XV-17", "PI-204"],
    risk: "warn",
  },
  {
    id: "WO-8841",
    title: "Work Order: P-204 seal replacement",
    type: "Maintenance Record",
    source: "CMMS",
    confidence: 91,
    summary: "Mechanical seal replaced twice in 42 days. Technician noted vibration spike and clogged suction strainer.",
    entities: ["P-204", "seal failure", "vibration", "suction strainer"],
    risk: "risk",
  },
  {
    id: "OEM-P204-11",
    title: "OEM Pump Manual Model SPX-220",
    type: "OEM Manual",
    source: "Vendor Docs",
    confidence: 88,
    summary: "Seal life drops when suction pressure falls below 1.8 bar or vibration exceeds 7 mm/s for sustained periods.",
    entities: ["P-204", "suction pressure", "seal flush", "vibration"],
    risk: "warn",
  },
  {
    id: "IR-2026-07",
    title: "Inspection Report: Cooling Water Skid",
    type: "Inspection Report",
    source: "Inspection Drive",
    confidence: 86,
    summary: "Inspector observed corrosion near pump baseplate and missing calibration label for PI-204.",
    entities: ["P-204", "corrosion", "PI-204", "calibration"],
    risk: "risk",
  },
  {
    id: "SOP-CW-03",
    title: "SOP: Cooling Water Pump Startup",
    type: "Operating Procedure",
    source: "QMS",
    confidence: 92,
    summary: "Requires strainer differential pressure check before startup and seal flush verification after handover.",
    entities: ["P-204", "startup", "strainer DP", "seal flush"],
    risk: "ok",
  },
  {
    id: "OISD-STD-137",
    title: "OISD Inspection Evidence Checklist",
    type: "Regulatory Requirement",
    source: "Compliance Library",
    confidence: 89,
    summary: "Requires current calibration evidence, inspection closure proof, and deviation sign-off for rotating equipment.",
    entities: ["OISD", "calibration", "inspection closure", "rotating equipment"],
    risk: "warn",
  },
  {
    id: "NM-2025-14",
    title: "Near Miss: High vibration after restart",
    type: "Near Miss Record",
    source: "EHS Portal",
    confidence: 84,
    summary: "A 2025 restart event on P-118 showed high vibration after strainer cleaning was skipped during shift handover.",
    entities: ["P-118", "near miss", "handover", "vibration"],
    risk: "warn",
  },
  {
    id: "CAPA-77",
    title: "CAPA: Repeat rotating equipment repairs",
    type: "Quality Record",
    source: "QMS",
    confidence: 87,
    summary: "Quality team requires CAPA when repeat repair interval falls below asset class baseline twice in one quarter.",
    entities: ["CAPA", "repeat repair", "asset baseline", "quality deviation"],
    risk: "warn",
  },
];

let connectors = [
  ["Engineering Vault", "412 drawings", "P&IDs, isometrics, datasheets"],
  ["CMMS", "638 work orders", "Failures, repairs, spares, technicians"],
  ["QMS", "286 procedures", "SOPs, CAPA, quality deviations"],
  ["Compliance Library", "149 controls", "OISD, PESO, Factory Act, environment"],
];

let relationships = [
  ["P-204", "WO-8841", "repeat failure"],
  ["P-204", "PID-204-REV-C", "shown on"],
  ["P-204", "OEM-P204-11", "manual"],
  ["P-204", "IR-2026-07", "inspection finding"],
  ["P-204", "SOP-CW-03", "procedure"],
  ["PI-204", "IR-2026-07", "calibration missing"],
  ["OISD", "OISD-STD-137", "requires evidence"],
  ["calibration", "PI-204", "applies to"],
  ["suction strainer", "SOP-CW-03", "pre-start check"],
  ["seal failure", "OEM-P204-11", "failure mode"],
  ["near miss", "NM-2025-14", "similar pattern"],
  ["CAPA", "CAPA-77", "quality trigger"],
  ["CAPA", "seal failure", "may apply"],
];

let metrics = [
  ["1,984", "records indexed"],
  ["7", "systems unified"],
  ["312", "asset tags linked"],
  ["73%", "faster time-to-answer"],
];

let priorities = [
  {
    title: "P-204 repeat seal failure pattern detected",
    text: "Work order, OEM limits, SOP checks, and a prior near miss point to suction restriction and vibration after startup.",
  },
  {
    title: "Compliance evidence gap: PI-204",
    text: "Inspection report says calibration label is missing. OISD checklist requires current proof in the audit package.",
  },
  {
    title: "CAPA watch condition created",
    text: "Repeat repair interval is below the rotating equipment baseline. A quality deviation will trigger if vibration recurs.",
  },
  {
    title: "Expert knowledge captured",
    text: "Retiring engineer note links handover misses to strainer DP checks and restart vibration on older cooling water pumps.",
  },
];

let pipelineSteps = [
  ["Ingest", "PDFs, scans, spreadsheets, drawings, email exports, and CMMS records enter a single intake queue."],
  ["OCR + Parse", "Document AI extracts tables, handwriting, drawing callouts, tags, dates, units, and procedure sections."],
  ["Entity Link", "Equipment tags, lines, people, regulations, quality deviations, and work orders are normalized."],
  ["Graph Build", "A plant ontology connects assets, events, procedures, evidence, risks, and regulatory obligations."],
  ["Agents", "Copilot, RCA, compliance, and lessons-learned agents retrieve cited context at the point of need."],
];

let prompts = [
  "Why is pump P-204 showing repeat seal failures?",
  "What compliance evidence is missing for PI-204?",
  "Which SOP steps matter before restarting P-204?",
  "Show lessons learned for vibration on cooling water pumps.",
  "Should this repeat repair trigger CAPA?",
];

let maintenanceAgents = [
  {
    title: "P-204 Seal Failure RCA",
    score: 87,
    text: "Likely chain: suction strainer fouling caused low suction pressure, vibration rose above OEM limit, then seal faces overheated during startup.",
    actions: ["Inspect and clean suction strainer before next restart", "Verify seal flush flow during handover", "Trend vibration for 48 hours after restart"],
  },
  {
    title: "Predictive Work Recommendation",
    score: 74,
    text: "Move P-204 to condition-based inspection for two weeks because repeat repair interval has dropped below the asset class baseline.",
    actions: ["Add daily strainer DP reading", "Schedule alignment check", "Review pump base corrosion finding"],
  },
  {
    title: "Optimized Maintenance Schedule",
    score: 79,
    text: "Bundle seal flush verification, alignment check, and PI-204 calibration during the same planned cooling water window.",
    actions: ["Create bundled work pack", "Reserve seal kit and calibration technician", "Notify operations before restart"],
  },
  {
    title: "Lessons Learned Match",
    score: 81,
    text: "Similar cooling water pump failures in 2023 and 2025 were linked to skipped startup DP checks after maintenance handover.",
    actions: ["Push SOP-CW-03 reminder to field mobile app", "Require closure photo for cleaned strainer", "Add supervisor sign-off for first restart"],
  },
];

let complianceItems = [
  {
    title: "OISD rotating equipment evidence",
    status: "Gap",
    risk: "risk",
    text: "Calibration evidence for PI-204 is missing from the latest inspection pack.",
    checks: ["Link IR-2026-07 finding", "Request calibration certificate", "Generate audit evidence bundle"],
  },
  {
    title: "Factory Act maintenance records",
    status: "Ready",
    risk: "ok",
    text: "Work order, inspection note, and SOP handover documents are available and source-linked.",
    checks: ["CMMS history indexed", "Procedure revision current", "Responsible engineer mapped"],
  },
  {
    title: "Quality deviation closure",
    status: "Watch",
    risk: "warn",
    text: "Repeat seal replacement may need CAPA if the next startup exceeds vibration threshold.",
    checks: ["RCA draft created", "Threshold from OEM manual cited", "CAPA trigger configured"],
  },
];

let evidencePack = [
  {
    title: "Requirement",
    text: "OISD rotating equipment checklist requires current calibration proof and inspection closure evidence.",
    sources: ["OISD-STD-137"],
  },
  {
    title: "Available evidence",
    text: "Work order, SOP revision, inspection note, OEM limits, and asset topology are linked to P-204.",
    sources: ["WO-8841", "SOP-CW-03", "PID-204-REV-C", "OEM-P204-11"],
  },
  {
    title: "Missing evidence",
    text: "Current PI-204 calibration certificate is not present. The system creates an owner action for instrumentation.",
    sources: ["IR-2026-07"],
  },
];

let lessons = [
  {
    title: "Restart vibration after handover",
    score: 84,
    text: "Near miss NM-2025-14 and WO-8841 share the same pattern: startup after maintenance, skipped strainer confirmation, vibration spike.",
    sources: ["NM-2025-14", "WO-8841", "SOP-CW-03"],
  },
  {
    title: "Repeat repair quality trigger",
    score: 78,
    text: "CAPA-77 applies when repeat repair interval drops below baseline twice in one quarter. P-204 is approaching that threshold.",
    sources: ["CAPA-77", "WO-8841"],
  },
  {
    title: "Expert note converted to rule",
    score: 72,
    text: "Senior engineer guidance says older CW pumps should be restarted only after strainer DP and seal flush are visually verified.",
    sources: ["SOP-CW-03", "OEM-P204-11"],
  },
];

let answers = {
  seal: {
    confidence: 87,
    text: "P-204 is most likely failing seals because the suction side is periodically restricted. The work order reports a clogged suction strainer and vibration spike; the OEM manual says seal life drops below 1.8 bar suction pressure or above 7 mm/s vibration. A prior near miss shows the same restart pattern, so the immediate field checks are strainer DP, seal flush, suction pressure, and vibration trending.",
    citations: ["WO-8841: repeat seal replacements, vibration spike, clogged suction strainer", "OEM-P204-11: suction pressure and vibration limits for seal life", "SOP-CW-03: strainer DP and seal flush startup checks", "NM-2025-14: similar restart vibration near miss"],
  },
  compliance: {
    confidence: 82,
    text: "PI-204 has a compliance evidence gap. The inspection report says the calibration label is missing, while the OISD checklist requires current calibration proof for rotating equipment evidence packs. The generated audit package should include the inspection finding, the OISD requirement, and an owner action for the missing certificate.",
    citations: ["IR-2026-07: missing calibration label for PI-204", "OISD-STD-137: current calibration evidence required"],
  },
  startup: {
    confidence: 90,
    text: "Before restarting P-204, technicians should confirm strainer differential pressure, verify seal flush flow, check suction pressure stability, and monitor vibration after handover. These steps are linked across the SOP, OEM manual, work order, and prior near miss.",
    citations: ["SOP-CW-03: pre-start strainer DP and seal flush checks", "OEM-P204-11: suction pressure and vibration operating limits", "WO-8841: prior failure context", "NM-2025-14: similar skipped handover check"],
  },
  lessons: {
    confidence: 81,
    text: "The strongest lessons learned are about restart discipline. Similar failures and near misses recur when strainer checks are skipped after maintenance handover. AssetIQ should push SOP-CW-03 to the field app, require proof of strainer cleaning, and add supervisor sign-off for the first restart.",
    citations: ["NM-2025-14: prior high-vibration restart near miss", "WO-8841: current repeat seal failure", "SOP-CW-03: required startup checks"],
  },
  capa: {
    confidence: 78,
    text: "This should be placed on CAPA watch. CAPA-77 says repeat repairs below the asset class baseline can trigger a quality deviation. P-204 has two seal replacements in 42 days, so the next vibration breach or repeat seal intervention should automatically open CAPA review.",
    citations: ["CAPA-77: repeat rotating equipment repair trigger", "WO-8841: two seal replacements in 42 days", "OEM-P204-11: vibration threshold linked to seal life"],
  },
  default: {
    confidence: 76,
    text: "The indexed graph currently has strong linked context around P-204, PI-204, cooling water startup, inspection evidence, repeat seal failure, near misses, and CAPA triggers. Use the command center to move from search to cited operational action.",
    citations: ["PID-204-REV-C: asset topology", "IR-2026-07: inspection findings", "SOP-CW-03: operating procedure"],
  },
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!response.ok) throw new Error(`API ${path} failed with ${response.status}`);
  return response.json();
}

function setBackendStatus(status, label) {
  const badge = $("#api-status");
  if (!badge) return;
  badge.classList.remove("online", "offline");
  if (status) badge.classList.add(status);
  badge.textContent = label;
}

async function loadBackendData() {
  if (window.location.protocol === "file:") {
    setBackendStatus("offline", "Static demo");
    return false;
  }

  try {
    const data = await apiRequest("/api/dashboard");
    documents = data.documents || documents;
    connectors = data.connectors || connectors;
    relationships = data.relationships || relationships;
    metrics = data.metrics || metrics;
    priorities = data.priorities || priorities;
    pipelineSteps = data.pipelineSteps || pipelineSteps;
    prompts = data.prompts || prompts;
    maintenanceAgents = data.maintenanceAgents || maintenanceAgents;
    complianceItems = data.complianceItems || complianceItems;
    evidencePack = data.evidencePack || evidencePack;
    lessons = data.lessons || lessons;
    setBackendStatus("online", "Backend online");
    return true;
  } catch (error) {
    setBackendStatus("offline", "Demo fallback");
    return false;
  }
}

function initCursor() {
  const ring = $(".custom-cursor");
  const dot = $(".custom-cursor-dot");
  if (!ring || !dot || window.matchMedia("(pointer: coarse)").matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  const moveCursor = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(moveCursor);
  };

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    document.body.classList.add("cursor-ready");
  });

  window.addEventListener("mouseleave", () => document.body.classList.remove("cursor-ready"));
  window.addEventListener("mouseenter", () => document.body.classList.add("cursor-ready"));

  document.addEventListener("mouseover", (event) => {
    if (event.target.closest("button, input, .nav-item, .prompt-button")) {
      document.body.classList.add("cursor-hover");
    }
  });

  document.addEventListener("mouseout", (event) => {
    if (event.target.closest("button, input, .nav-item, .prompt-button")) {
      document.body.classList.remove("cursor-hover");
    }
  });

  moveCursor();
}

function initScrollReveal() {
  const revealSelectors = [
    ".hero-strip",
    ".metric",
    ".panel",
    ".feed-item",
    ".connector-card",
    ".pipeline-step",
    ".doc-card",
    ".agent-card",
    ".compliance-card",
    ".evidence-item",
    ".lesson-card",
    ".prompt-button",
  ];
  const elements = $$(revealSelectors.join(", "));
  elements.forEach((element) => element.classList.add("scroll-reveal"));

  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
  );

  elements.forEach((element) => observer.observe(element));
}

function initScrollProgress() {
  const progress = $(".scroll-progress");
  if (!progress) return;

  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progressValue = scrollable > 0 ? window.scrollY / scrollable : 0;
    progress.style.transform = `scaleX(${Math.min(1, Math.max(0, progressValue))})`;
  };

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
}

function renderMetrics() {
  $("#metrics").innerHTML = metrics
    .map(([value, label]) => `<article class="metric"><span>${label}</span><strong>${value}</strong></article>`)
    .join("");
}

function renderPriorityFeed() {
  $("#priority-feed").innerHTML = priorities
    .map((item) => `<article class="feed-item"><strong>${item.title}</strong><p>${item.text}</p></article>`)
    .join("");
}

function renderConnectors() {
  $("#connector-grid").innerHTML = connectors
    .map(
      ([name, count, text]) =>
        `<article class="connector-card"><span class="eyebrow">${count}</span><strong>${name}</strong><p>${text}</p></article>`,
    )
    .join("");
}

function renderPipeline(done = false) {
  $("#pipeline").innerHTML = pipelineSteps
    .map(
      ([title, text], index) =>
        `<article class="pipeline-step ${done || index < 2 ? "done" : ""}"><span class="eyebrow">Step ${index + 1}</span><strong>${title}</strong><p>${text}</p></article>`,
    )
    .join("");
}

function riskClass(risk) {
  if (risk === "risk") return "risk";
  if (risk === "warn") return "warn";
  return "indigo";
}

function renderDocuments() {
  $("#document-grid").innerHTML = documents
    .map(
      (doc) => `
      <article class="doc-card">
        <header>
          <div>
            <span class="eyebrow">${doc.type}</span>
            <h3>${doc.title}</h3>
          </div>
          <span class="confidence">${doc.confidence}%</span>
        </header>
        <p>${doc.summary}</p>
        <div class="entity-list">
          ${doc.entities.map((entity) => `<span class="tag ${riskClass(doc.risk)}">${entity}</span>`).join("")}
        </div>
      </article>`,
    )
    .join("");
}

function renderGraph() {
  const svg = $("#knowledge-graph");
  const nodes = [
    ["P-204", 470, 218, "#8a5a33"],
    ["WO-8841", 230, 98, "#9a5742"],
    ["PID-204-REV-C", 690, 82, "#7f746b"],
    ["OEM-P204-11", 740, 260, "#9b633a"],
    ["IR-2026-07", 238, 340, "#9a5742"],
    ["SOP-CW-03", 470, 398, "#6f795f"],
    ["PI-204", 130, 220, "#7f746b"],
    ["OISD", 842, 386, "#2a2119"],
    ["calibration", 86, 400, "#9d713d"],
    ["seal failure", 370, 46, "#9a5742"],
    ["suction strainer", 610, 420, "#6f795f"],
    ["near miss", 106, 78, "#9d713d"],
    ["CAPA", 840, 118, "#7f746b"],
  ];
  const nodeMap = Object.fromEntries(nodes.map(([id, x, y, color]) => [id, { x, y, color }]));
  const links = relationships
    .filter(([a, b]) => nodeMap[a] && nodeMap[b])
    .map(([a, b]) => `<line class="graph-link" x1="${nodeMap[a].x}" y1="${nodeMap[a].y}" x2="${nodeMap[b].x}" y2="${nodeMap[b].y}" />`)
    .join("");
  const nodeMarkup = nodes
    .map(
      ([id, x, y, color]) => `
      <g class="graph-node" transform="translate(${x} ${y})">
        <circle r="${id === "P-204" ? 40 : 28}" fill="${color}"></circle>
        <text x="0" y="${id === "P-204" ? 61 : 46}" text-anchor="middle">${id}</text>
      </g>`,
    )
    .join("");
  svg.innerHTML = `<rect x="0" y="0" width="960" height="470" rx="12" fill="#fffdf8"></rect>${links}${nodeMarkup}`;
}

function renderPrompts() {
  $("#prompt-list").innerHTML = prompts.map((prompt) => `<button class="prompt-button">${prompt}</button>`).join("");
  $$("#prompt-list .prompt-button").forEach((button) => {
    button.addEventListener("click", () => {
      $("#query-input").value = button.textContent;
      askCopilot(button.textContent);
    });
  });
}

function renderMaintenance() {
  $("#maintenance-grid").innerHTML = maintenanceAgents
    .map(
      (agent) => `
      <article class="agent-card">
        <header>
          <h3>${agent.title}</h3>
          <span class="confidence">${agent.score}%</span>
        </header>
        <p>${agent.text}</p>
        <div class="risk-bar"><span style="width:${agent.score}%"></span></div>
        <div class="checklist">${agent.actions.map((action) => `<div class="check">${action}</div>`).join("")}</div>
      </article>`,
    )
    .join("");
}

function renderCompliance() {
  $("#compliance-board").innerHTML = complianceItems
    .map(
      (item) => `
      <article class="compliance-card">
        <header>
          <h3>${item.title}</h3>
          <span class="tag ${riskClass(item.risk)}">${item.status}</span>
        </header>
        <p>${item.text}</p>
        <div class="checklist">${item.checks.map((check) => `<div class="check">${check}</div>`).join("")}</div>
      </article>`,
    )
    .join("");
}

function renderEvidencePack() {
  $("#evidence-pack").innerHTML = evidencePack
    .map(
      (item) => `
      <article class="evidence-item">
        <strong>${item.title}</strong>
        <p>${item.text}</p>
        <div class="source-list">${item.sources.map((source) => `<span class="tag indigo">${source}</span>`).join("")}</div>
      </article>`,
    )
    .join("");
}

function renderLessons() {
  $("#lessons-board").innerHTML = lessons
    .map(
      (lesson) => `
      <article class="lesson-card">
        <header>
          <h3>${lesson.title}</h3>
          <span class="confidence">${lesson.score}%</span>
        </header>
        <p>${lesson.text}</p>
        <div class="source-list">${lesson.sources.map((source) => `<span class="tag warn">${source}</span>`).join("")}</div>
      </article>`,
    )
    .join("");
}

function answerFor(query) {
  const normalized = query.toLowerCase();
  if (normalized.includes("capa") || normalized.includes("quality")) return answers.capa;
  if (normalized.includes("lesson") || normalized.includes("near miss") || normalized.includes("vibration on cooling")) return answers.lessons;
  if (normalized.includes("compliance") || normalized.includes("pi-204") || normalized.includes("calibration")) return answers.compliance;
  if (normalized.includes("startup") || normalized.includes("restart") || normalized.includes("sop")) return answers.startup;
  if (normalized.includes("seal") || normalized.includes("pump")) return answers.seal;
  return answers.default;
}

async function askCopilot(query) {
  let answer = answerFor(query);
  let retrievedDocuments = [];
  let source = "Local fallback";

  if (window.location.protocol !== "file:") {
    try {
      const payload = await apiRequest("/api/query", {
        method: "POST",
        body: JSON.stringify({ query }),
      });
      answer = payload.answer || answer;
      retrievedDocuments = payload.retrievedDocuments || [];
      source = payload.servedBy || "AssetIQ backend";
      setBackendStatus("online", "Backend online");
    } catch (error) {
      setBackendStatus("offline", "Demo fallback");
    }
  }

  const chat = $("#chat-log");
  chat.insertAdjacentHTML("beforeend", `<div class="message user">${query}</div>`);
  chat.insertAdjacentHTML(
    "beforeend",
    `<div class="message bot">
      <div class="answer">
        <span class="confidence">${answer.confidence}% confidence</span>
        <p>${answer.text}</p>
        <span class="eyebrow">${source}</span>
        <div class="citation-list">
          ${answer.citations.map((citation) => `<div class="citation">${citation}</div>`).join("")}
          ${retrievedDocuments.map((doc) => `<div class="citation">Retrieved: ${doc.id} - ${doc.title}</div>`).join("")}
        </div>
      </div>
    </div>`,
  );
  chat.scrollTop = chat.scrollHeight;
}

function switchView(view) {
  $$(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  $$(".view").forEach((panel) => panel.classList.toggle("active", panel.id === `view-${view}`));
  requestAnimationFrame(() => {
    $$(".view.active .scroll-reveal").forEach((element) => element.classList.add("is-visible"));
  });
}

async function runDemo() {
  switchView("ingestion");
  renderPipeline(false);
  if (window.location.protocol !== "file:") {
    try {
      const payload = await apiRequest("/api/ingest", {
        method: "POST",
        body: JSON.stringify({
          title: "Uploaded Shift Handover Note: P-204 restart",
          type: "Email / Field Note",
          source: "Mobile Intake",
          text: "Night shift reported P-204 vibration after restart. PI-204 calibration evidence still missing. Seal flush visually confirmed by operator.",
          entities: ["P-204", "PI-204", "seal flush", "vibration"],
          risk: "warn",
        }),
      });
      documents = [payload.document, ...documents.filter((doc) => doc.id !== payload.document.id)];
      relationships = payload.graphLinks ? relationships : relationships;
      setBackendStatus("online", "Ingested via API");
    } catch (error) {
      setBackendStatus("offline", "Demo fallback");
    }
  }
  setTimeout(() => {
    renderPipeline(true);
    renderDocuments();
  }, 450);
  setTimeout(() => switchView("command"), 950);
}

async function init() {
  initCursor();
  initScrollProgress();
  await loadBackendData();
  renderMetrics();
  renderPriorityFeed();
  renderConnectors();
  renderPipeline(false);
  renderDocuments();
  renderGraph();
  renderPrompts();
  renderMaintenance();
  renderCompliance();
  renderEvidencePack();
  renderLessons();
  initScrollReveal();
  await askCopilot("Why is pump P-204 showing repeat seal failures?");

  $$(".nav-item").forEach((item) => item.addEventListener("click", () => switchView(item.dataset.view)));
  $("#open-copilot").addEventListener("click", () => switchView("copilot"));
  $("#run-demo").addEventListener("click", runDemo);
  $("#ingest-docs").addEventListener("click", runDemo);
  $("#query-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const query = $("#query-input").value.trim();
    if (query) askCopilot(query);
  });
}

init();
