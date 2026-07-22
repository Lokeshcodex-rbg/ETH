# OpsBrain

Industrial Knowledge Intelligence prototype for a unified asset and operations brain.

## Working Prototype

Run the full-stack app in VS Code or any terminal:

```bash
cd outputs/industrial-knowledge-brain
npm start
```

Then open `http://127.0.0.1:4180/index.html`.

On Windows, you can also double-click:

`outputs/industrial-knowledge-brain/run.bat`

The prototype includes:

- Universal industrial document ingestion workflow
- Entity extraction demo for P&IDs, work orders, SOPs, OEM manuals, inspections, compliance records, near-miss reports, and CAPA records
- Knowledge graph view for linked asset intelligence
- Real local backend APIs for dashboard data, query answers, ingestion, graph links, RCA, compliance, and lessons learned
- Expert copilot with confidence scores, cited sources, and retrieved document context
- Maintenance RCA and predictive recommendations
- Compliance gap detection and audit evidence package
- Lessons learned and failure-pattern intelligence

## Deliverables

- `outputs/industrial-knowledge-brain/index.html` - frontend prototype
- `outputs/industrial-knowledge-brain/styles.css` - UI styling
- `outputs/industrial-knowledge-brain/app.js` - frontend logic wired to backend APIs
- `outputs/industrial-knowledge-brain/backend/server.js` - zero-install Node backend
- `outputs/industrial-knowledge-brain/backend/data-store.js` - in-memory industrial knowledge store
- `outputs/industrial-knowledge-brain/package.json` - start/check scripts
- `outputs/industrial-knowledge-brain/.vscode/tasks.json` - VS Code run task
- `outputs/industrial-knowledge-brain/run.bat` - Windows launcher
- `outputs/industrial-knowledge-brain/architecture.md` - architecture notes
- `outputs/industrial-knowledge-brain/OpsBrain-Pitch-Deck.pptx` - pitch deck
- `outputs/industrial-knowledge-brain/demo-video-script.md` - demo video script

## Demo Flow

1. Open the command center.
2. Run demo ingestion. This calls `POST /api/ingest`.
3. Ask the copilot: `Why is pump P-204 showing repeat seal failures?` This calls `POST /api/query`.
4. Show the maintenance RCA actions.
5. Show the compliance evidence gap for PI-204.
6. Show lessons learned and CAPA intelligence.
