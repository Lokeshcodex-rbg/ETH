const state = {
  documents: [
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
  ],
  connectors: [
    ["Engineering Vault", "412 drawings", "P&IDs, isometrics, datasheets"],
    ["CMMS", "638 work orders", "Failures, repairs, spares, technicians"],
    ["QMS", "286 procedures", "SOPs, CAPA, quality deviations"],
    ["Compliance Library", "149 controls", "OISD, PESO, Factory Act, environment"],
  ],
  relationships: [
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
  ],
  metrics: [
    ["1,984", "records indexed"],
    ["7", "systems unified"],
    ["312", "asset tags linked"],
    ["73%", "faster time-to-answer"],
  ],
  priorities: [
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
  ],
  pipelineSteps: [
    ["Ingest", "PDFs, scans, spreadsheets, drawings, email exports, and CMMS records enter a single intake queue."],
    ["OCR + Parse", "Document intelligence extracts tables, handwriting, drawing callouts, tags, dates, units, and procedure sections."],
    ["Entity Link", "Equipment tags, lines, people, regulations, quality deviations, and work orders are normalized."],
    ["Graph Build", "A plant ontology connects assets, events, procedures, evidence, risks, and regulatory obligations."],
    ["Agents", "Copilot, RCA, compliance, and lessons-learned agents retrieve cited context at the point of need."],
  ],
  prompts: [
    "Why is pump P-204 showing repeat seal failures?",
    "What compliance evidence is missing for PI-204?",
    "Which SOP steps matter before restarting P-204?",
    "Show lessons learned for vibration on cooling water pumps.",
    "Should this repeat repair trigger CAPA?",
  ],
  maintenanceAgents: [
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
  ],
  complianceItems: [
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
  ],
  evidencePack: [
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
  ],
  lessons: [
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
  ],
};

const answers = {
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
    text: "The strongest lessons learned are about restart discipline. Similar failures and near misses recur when strainer checks are skipped after maintenance handover. OpsBrain should push SOP-CW-03 to the field app, require proof of strainer cleaning, and add supervisor sign-off for the first restart.",
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

function answerFor(query) {
  const normalized = String(query || "").toLowerCase();
  if (normalized.includes("capa") || normalized.includes("quality")) return answers.capa;
  if (normalized.includes("lesson") || normalized.includes("near miss") || normalized.includes("vibration on cooling")) return answers.lessons;
  if (normalized.includes("compliance") || normalized.includes("pi-204") || normalized.includes("calibration")) return answers.compliance;
  if (normalized.includes("startup") || normalized.includes("restart") || normalized.includes("sop")) return answers.startup;
  if (normalized.includes("seal") || normalized.includes("pump")) return answers.seal;
  return answers.default;
}

function searchDocuments(query) {
  const needle = String(query || "").toLowerCase();
  if (!needle) return state.documents;
  return state.documents.filter((doc) => {
    const haystack = [doc.id, doc.title, doc.type, doc.source, doc.summary, ...doc.entities].join(" ").toLowerCase();
    return haystack.includes(needle);
  });
}

function ingestDocument(payload = {}) {
  const text = String(payload.text || payload.summary || "");
  const title = String(payload.title || "Uploaded Field Note");
  const type = String(payload.type || "Field Upload");
  const source = String(payload.source || "Mobile Intake");
  const entities = Array.from(
    new Set((text.match(/\b[A-Z]{1,5}-?\d{2,4}[A-Z]?\b/g) || []).concat(payload.entities || [])),
  );
  if (!entities.length) entities.push("P-204", "field note");

  const doc = {
    id: payload.id || `UP-${Date.now().toString().slice(-6)}`,
    title,
    type,
    source,
    confidence: Math.min(95, Math.max(72, Number(payload.confidence) || 83)),
    summary: text || "Uploaded note indexed into the industrial knowledge graph.",
    entities,
    risk: payload.risk || (text.toLowerCase().includes("missing") || text.toLowerCase().includes("vibration") ? "warn" : "ok"),
  };

  state.documents.unshift(doc);
  entities.forEach((entity) => state.relationships.push([entity, doc.id, "extracted from"]));
  return doc;
}

function getDashboard() {
  return {
    documents: state.documents,
    connectors: state.connectors,
    relationships: state.relationships,
    metrics: state.metrics,
    priorities: state.priorities,
    pipelineSteps: state.pipelineSteps,
    prompts: state.prompts,
    maintenanceAgents: state.maintenanceAgents,
    complianceItems: state.complianceItems,
    evidencePack: state.evidencePack,
    lessons: state.lessons,
  };
}

module.exports = {
  state,
  answers,
  answerFor,
  searchDocuments,
  ingestDocument,
  getDashboard,
};
