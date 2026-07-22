const kpis = [
  ["Project Health", "82", "down", "-6 pts", "UPS variance is suppressing executive score.", "91%", [18, 22, 24, 21, 26, 31, 29, 34]],
  ["Schedule Risk", "High", "down", "+14d", "Critical path exposure concentrated in UPS and BMS.", "87%", [14, 18, 23, 28, 35, 39, 44, 51]],
  ["Compliance Score", "94%", "up", "+3%", "11 violations auto-linked to procurement gates.", "93%", [22, 21, 24, 28, 29, 33, 36, 39]],
  ["Budget Exposure", "$3.8M", "down", "+$620K", "Delay damages and rework remain inside contingency.", "78%", [12, 16, 15, 20, 23, 26, 25, 30]],
  ["Commissioning Readiness", "61%", "up", "+8%", "384 IST procedures digitised with 47 gaps open.", "89%", [8, 12, 16, 18, 24, 30, 35, 39]],
  ["Supply Chain Status", "92%", "up", "148 live", "6 shipment alerts are being actively mitigated.", "85%", [30, 31, 34, 32, 36, 39, 38, 42]],
];

const deviations = [
  {
    id: "DEV-UPS-017",
    package: "Electrical",
    severity: "high",
    title: "UPS harmonic distortion exceeds client limit",
    summary: "Vendor submittal allows 5% THDi at 80% load; project specification requires <= 3% for Tier IV readiness.",
    spec: "DC-ELEC-SPEC-04 clause 6.2.3: Input current THDi shall not exceed 3% at 50-100% load.",
    source: "Submittal UPS-MOD-ATL-221 Rev C, page 18.",
    action: "Hold PO release, request active filter confirmation, log NCR against package EL-UPS-02.",
  },
  {
    id: "DEV-MECH-044",
    package: "Mechanical",
    severity: "medium",
    title: "Chiller FAT witness point missing",
    summary: "ITP omits client witness hold point before compressor performance certification.",
    spec: "QMS-ITP-MECH-11 section 4.5 requires client witness before dispatch.",
    source: "Vendor ITP CHW-900-ITP Rev B.",
    action: "Add hold point, resubmit ITP, update FAT date dependency in P6 schedule.",
  },
  {
    id: "DEV-BMS-009",
    package: "Controls",
    severity: "high",
    title: "BMS alarm priority matrix not aligned with IST script",
    summary: "Smoke purge and CRAH high-temperature alarms are configured as P2 but commissioning script expects P1.",
    spec: "IST-PROTOCOL-07 requires life-safety and thermal runaway alarms as P1.",
    source: "BMS points list BMS-PL-113 Rev A.",
    action: "Revise alarm matrix, regenerate IST scripts, notify commissioning lead.",
  },
  {
    id: "DEV-EL-031",
    package: "Electrical",
    severity: "low",
    title: "Panel label format differs from project standard",
    summary: "Shop drawing uses supplier sequence labels instead of campus asset tag convention.",
    spec: "Asset Tagging Standard ATS-01 uses SITE-BLDG-SYS-EQUIP sequence.",
    source: "LV panel shop drawing LVP-SD-208.",
    action: "Correct labels before IFC drawing issue.",
  },
];

const actions = [
  ["Freeze UPS PO release", "Avoids 14-day exposure by resolving THDi variance before factory build.", "high"],
  ["Pull chiller FAT forward", "Split witness team and approve remote evidence for non-critical points.", "medium"],
  ["Add BMS alarm peer review", "Prevents IST retest by aligning P1/P2 mapping with acceptance script.", "high"],
  ["Bundle open RFIs by system", "23 related power-chain questions can close in one technical workshop.", "low"],
];

const activity = [
  ["12:42", "AI linked DEV-UPS-017 to activity P6-EL-204 and PO EL-UPS-02."],
  ["12:35", "Supplier score for ATL Power dropped from 91 to 76 after FAT slip."],
  ["12:18", "RFI-184 cited as precedent for harmonic distortion rejection."],
  ["11:57", "Commissioning record IST-041 generated and QMS locked."],
];

const scheduleRows = [
  ["UPS manufacturing release", 42, "risk", "+11 days risk"],
  ["Chiller FAT and dispatch", 58, "risk", "+7 days risk"],
  ["MV switchgear install", 76, "ok", "on track"],
  ["BMS point-to-point testing", 51, "risk", "+5 days risk"],
  ["Integrated system testing", 33, "ok", "starts Aug 19"],
];

const ganttRows = [
  ["Design freeze", 88, "ok", "closed"],
  ["UPS release", 38, "critical", "critical"],
  ["Chiller FAT", 55, "critical", "watch"],
  ["MV install", 72, "ok", "stable"],
  ["IST window", 28, "critical", "at risk"],
];

const delayHeat = [
  ["W1", "UPS", "hot"],
  ["W2", "BMS", "hot"],
  ["W3", "FAT", "warm"],
  ["W4", "IST", "hot"],
  ["W5", "MV", "cool"],
  ["W6", "QA", "warm"],
];

const supplyOptions = [
  ["ATL Power", "Score 76 / ETA +6d / active filter kit required."],
  ["Bengaluru Controls", "Score 94 / alternate active filter can ship in 9 days."],
  ["Chennai Broker Lane", "Score 88 / customs release probability improves by 64%."],
  ["Pune Generator Buffer", "Score 96 / two sets ready for first energisation."],
];

const tests = [
  {
    title: "Utility failure transfer",
    status: "done",
    criteria: ["ATS transfers within 10 seconds.", "UPS output voltage remains within +/- 2%.", "Event log synchronises to QMS record."],
  },
  {
    title: "Load bank step-up",
    status: "current",
    criteria: ["Increase IT load in 25% increments.", "No breaker trip or thermal alarm at 100% for 30 minutes.", "Power quality report attached."],
  },
  {
    title: "CRAH failover",
    status: "pending",
    criteria: ["N+1 unit starts automatically.", "Cold aisle temperature recovers below 27 C.", "BMS alarm priority logged as P1."],
  },
  {
    title: "Black building recovery",
    status: "pending",
    criteria: ["Generator synchronisation complete.", "Critical bus restored in sequence.", "Witness signatures captured."],
  },
];

const progress = [
  ["FAT", 78],
  ["SAT", 64],
  ["IST", 41],
  ["Failed tests", 7],
];

const rfis = [
  ["RFI-184", "UPS THDi accepted only after active filter datasheet and factory test curve were attached."],
  ["RFI-096", "Client rejected a 5% harmonic proposal because it conflicted with utility interconnect limits."],
  ["NCR-041", "Alarm priority correction caused one IST retest cycle; BMS matrix freeze required before scripts."],
];

const heatmapCells = [
  ["UPS", "92", "hot"],
  ["BMS", "81", "hot"],
  ["Chiller", "74", "warm"],
  ["Switchgear", "69", "warm"],
  ["Generator", "32", "cool"],
  ["CRAH", "46", "cool"],
  ["Civil", "28", "cool"],
  ["ELV", "57", "warm"],
  ["Fire", "61", "warm"],
  ["Network", "36", "cool"],
  ["QMS", "78", "hot"],
  ["IST", "84", "hot"],
];

let currentTest = 1;
let auditCount = 0;

function sparkline(points) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const coords = points
    .map((point, index) => {
      const x = 4 + index * (92 / (points.length - 1));
      const y = 30 - ((point - min) / Math.max(max - min, 1)) * 24;
      return `${x},${y}`;
    })
    .join(" ");
  return `<svg class="sparkline" viewBox="0 0 100 34" preserveAspectRatio="none"><polyline points="${coords}" /></svg>`;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2800);
}

function activateView(viewId) {
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === viewId));
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === viewId));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderKpis() {
  document.getElementById("kpiGrid").innerHTML = kpis
    .map(
      ([label, value, trend, delta, insight, confidence, points]) => `
        <article class="metric-card">
          <div class="kpi-top"><span>${label}</span><span class="trend ${trend}">${trend === "up" ? "up" : "down"} ${delta}</span></div>
          <strong>${value}</strong>
          ${sparkline(points)}
          <p class="kpi-insight">${insight}</p>
          <span class="kpi-confidence">${confidence} AI confidence</span>
        </article>
      `,
    )
    .join("");
}

function renderActivity() {
  document.getElementById("activityStream").innerHTML = activity
    .map(([time, text]) => `<div class="activity-item"><span>${time}</span><strong>${text}</strong></div>`)
    .join("");
}

function renderActions() {
  document.getElementById("actionList").innerHTML = actions
    .map(
      ([title, text, severity]) => `
        <div class="action">
          <span class="severity ${severity}">${severity}</span>
          <strong>${title}</strong>
          <p>${text}</p>
        </div>
      `,
    )
    .join("");
}

function renderDeviations() {
  const filter = document.getElementById("packageFilter").value;
  const visible = filter === "all" ? deviations : deviations.filter((item) => item.package === filter);
  document.getElementById("deviationList").innerHTML = visible
    .map(
      (item, index) => `
        <button class="record ${index === 0 ? "active" : ""}" data-dev="${item.id}">
          <span class="severity ${item.severity}">${item.severity}</span>
          <strong>${item.id} / ${item.title}</strong>
          <p>${item.summary}</p>
        </button>
      `,
    )
    .join("");
  renderEvidence((visible[0] || deviations[0]).id);
}

function renderEvidence(id) {
  const item = deviations.find((entry) => entry.id === id);
  if (!item) return;
  document.getElementById("evidenceTitle").textContent = `${item.id}: ${item.title}`;
  document.getElementById("evidenceBody").innerHTML = `
    <div class="evidence-block"><span>Detected issue</span>${item.summary}</div>
    <div class="evidence-block"><span>Specification citation</span>${item.spec}</div>
    <div class="evidence-block"><span>Vendor source</span>${item.source}</div>
    <div class="evidence-block"><span>Recommended workflow</span>${item.action}</div>
  `;
}

function renderTimeline(mitigated = false) {
  document.getElementById("timeline").innerHTML = scheduleRows
    .map(([name, progressValue, state, label]) => {
      const adjusted = mitigated && state === "risk" ? Math.min(progressValue + 13, 92) : progressValue;
      const adjustedLabel = mitigated && state === "risk" ? "mitigated" : label;
      return `
        <div class="timeline-row">
          <strong>${name}</strong>
          <div class="bar-track"><div class="bar ${state === "risk" && !mitigated ? "risk" : ""}" style="width:${adjusted}%"></div></div>
          <span class="trend ${state === "risk" && !mitigated ? "down" : "up"}">${adjustedLabel}</span>
        </div>
      `;
    })
    .join("");
}

function renderGantt() {
  document.getElementById("ganttChart").innerHTML = ganttRows
    .map(
      ([name, width, state, label]) => `
        <div class="gantt-row">
          <strong>${name}</strong>
          <div class="gantt-track"><div class="gantt-bar ${state}" style="width:${width}%"></div></div>
          <span class="trend ${state === "critical" ? "down" : "up"}">${label}</span>
        </div>
      `,
    )
    .join("");
}

function renderDelayHeatmap() {
  document.getElementById("delayHeatmap").innerHTML = delayHeat
    .map(([week, label, state]) => `<div class="heat-cell ${state}"><b>${week}</b><span>${label}</span></div>`)
    .join("");
}

function renderSupplyOptions() {
  document.getElementById("supplyOptions").innerHTML = supplyOptions
    .map(([title, text]) => `<div class="record"><strong>${title}</strong><p>${text}</p></div>`)
    .join("");
}

function renderHeatmap() {
  document.getElementById("riskHeatmap").innerHTML = heatmapCells
    .map(([label, score, state]) => `<div class="heat-cell ${state}"><b>${label}</b><span>${score}% risk</span></div>`)
    .join("");
}

function renderProgressRings() {
  document.getElementById("progressRings").innerHTML = progress
    .map(([label, value]) => {
      const ringValue = label === "Failed tests" ? Math.min(value * 8, 100) : value;
      const display = label === "Failed tests" ? value : `${value}%`;
      return `<div class="progress-ring"><div class="ring" style="--value:${ringValue}%"><strong>${display}</strong></div><span>${label}</span></div>`;
    })
    .join("");
}

function renderTests() {
  const sequence = document.getElementById("testSequence");
  sequence.innerHTML = tests
    .map(
      (test, index) => `
        <button class="test-step ${test.status}" data-test="${index}">
          <span class="step-number">${test.status === "done" ? "OK" : index + 1}</span>
          <strong>${test.title}</strong>
          <span class="trend ${test.status === "done" ? "up" : test.status === "current" ? "" : "down"}">${test.status}</span>
        </button>
      `,
    )
    .join("");
  renderTestDetail(currentTest);
}

function renderTestDetail(index) {
  const test = tests[index];
  currentTest = index;
  document.getElementById("testTitle").textContent = test.title;
  document.getElementById("criteriaList").innerHTML = test.criteria.map((item) => `<li>${item}</li>`).join("");
  document.getElementById("recordId").textContent = `IST-${String(index + 41).padStart(3, "0")}`;
}

function renderChat() {
  document.getElementById("chatBox").innerHTML = `
    <div class="chat-message user"><strong>Engineer</strong><p>Has this UPS harmonic variance appeared before?</p></div>
    <div class="chat-message"><strong>DataCentreIQ Knowledge Assistant</strong><p>Yes. RFI-184 and RFI-096 both rejected 5% THDi unless active filtering and factory curves proved compliance. Suggested response: require the vendor to resubmit against DC-ELEC-SPEC-04 clause 6.2.3 and link the decision to PO release gate EL-UPS-02.</p></div>
  `;
}

function renderRfis() {
  document.getElementById("rfiList").innerHTML = rfis
    .map(([id, text]) => `<div class="record"><strong>${id}</strong><p>${text}</p></div>`)
    .join("");
}

function animateRiskCanvas() {
  const canvas = document.getElementById("riskCanvas");
  const ctx = canvas.getContext("2d");
  const nodes = Array.from({ length: 38 }, (_, index) => ({
    x: 130 + ((index * 97) % 920),
    y: 65 + ((index * 61) % 380),
    r: index % 9 === 0 ? 9 : 5 + (index % 4),
    label: ["Specs", "PO", "BIM", "P6", "QMS", "RFI", "IST", "FAT", "BMS"][index % 9],
    color: index % 7 === 0 ? "#ff4d5e" : index % 5 === 0 ? "#ffb84d" : index % 3 === 0 ? "#00e676" : "#00d4ff",
    vx: (Math.sin(index) * 0.28),
    vy: (Math.cos(index * 1.7) * 0.24),
  }));
  const links = Array.from({ length: 72 }, (_, index) => [index % nodes.length, (index * 7 + 5) % nodes.length]);
  let t = 0;

  function draw() {
    t += 0.018;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#061320";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(0,212,255,0.065)";
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 44) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 44) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    nodes.forEach((node) => {
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < 70 || node.x > canvas.width - 70) node.vx *= -1;
      if (node.y < 45 || node.y > canvas.height - 45) node.vy *= -1;
    });

    links.forEach(([from, to], index) => {
      const a = nodes[from];
      const b = nodes[to];
      ctx.strokeStyle = index % 8 === 0 ? "rgba(255,77,94,0.34)" : "rgba(0,212,255,0.18)";
      ctx.lineWidth = index % 8 === 0 ? 1.7 : 1;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();

      if (index % 5 === 0) {
        const pulse = (Math.sin(t * 2.5 + index) + 1) / 2;
        const px = a.x + (b.x - a.x) * pulse;
        const py = a.y + (b.y - a.y) * pulse;
        ctx.fillStyle = index % 10 === 0 ? "#ff4d5e" : "#00e676";
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    nodes.forEach((node, index) => {
      const pulse = Math.sin(t * 3 + index) * 1.4;
      ctx.fillStyle = node.color;
      ctx.shadowColor = node.color;
      ctx.shadowBlur = index % 7 === 0 ? 24 : 12;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r + pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      if (index % 6 === 0) {
        ctx.fillStyle = "#f7fbff";
        ctx.font = "700 11px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(node.label, node.x, node.y - 14);
      }
    });

    requestAnimationFrame(draw);
  }

  draw();
}

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => activateView(button.dataset.view));
});

document.getElementById("packageFilter").addEventListener("change", renderDeviations);

document.getElementById("deviationList").addEventListener("click", (event) => {
  const record = event.target.closest("[data-dev]");
  if (!record) return;
  document.querySelectorAll("#deviationList .record").forEach((item) => item.classList.remove("active"));
  record.classList.add("active");
  renderEvidence(record.dataset.dev);
});

document.getElementById("rebalanceSchedule").addEventListener("click", () => {
  renderTimeline(true);
  showToast("Mitigation simulator recovered 9 forecast days on the critical path.");
});

document.getElementById("completeStep").addEventListener("click", () => {
  tests[currentTest].status = "done";
  const next = tests.findIndex((test) => test.status === "pending");
  if (next >= 0) {
    tests[next].status = "current";
    currentTest = next;
  }
  renderTests();
  showToast("QA record signed, cited, and appended to the commissioning package.");
});

document.getElementById("testSequence").addEventListener("click", (event) => {
  const step = event.target.closest("[data-test]");
  if (!step) return;
  renderTestDetail(Number(step.dataset.test));
});

document.getElementById("chatForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.getElementById("questionInput");
  const chat = document.getElementById("chatBox");
  chat.insertAdjacentHTML("beforeend", `<div class="chat-message user"><strong>Engineer</strong><p>${input.value}</p></div>`);
  chat.insertAdjacentHTML(
    "beforeend",
    `<div class="chat-message"><strong>DataCentreIQ Knowledge Assistant</strong><p>I found 3 linked records and 2 specification clauses. Highest-confidence action: block package release until the vendor maps the variance to acceptance criteria and uploads revised FAT evidence.</p></div>`,
  );
  chat.scrollTop = chat.scrollHeight;
  input.value = "";
});

document.getElementById("runAudit")?.addEventListener("click", () => {
  auditCount += 1;
  showToast(`AI scan complete: ${3 + auditCount} critical risks re-ranked across EPC graph.`);
});

document.getElementById("createReport")?.addEventListener("click", () => {
  showToast("Executive board pack exported: 27 violations, 384 test records, 61 cited RFIs.");
});

renderKpis();
renderActivity();
renderActions();
renderDeviations();
renderTimeline();
renderGantt();
renderDelayHeatmap();
renderHeatmap();
renderSupplyOptions();
renderProgressRings();
renderTests();
renderChat();
renderRfis();
animateRiskCanvas();
