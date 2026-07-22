# OpsBrain Prototype

Run the backend to use the full working prototype in VS Code or any terminal:

```bash
npm start
```

Then open `http://127.0.0.1:4180/index.html`.

You can still open `index.html` directly as a static fallback, but the judged full-stack demo should use the backend URL.

For Windows, you can also double-click `run.bat`.

## Included Deliverables

- `index.html`, `styles.css`, `app.js`: working frontend
- `backend/server.js`: zero-install Node backend serving the UI and APIs
- `backend/data-store.js`: in-memory industrial knowledge data, graph links, agents, and ingestion logic
- `package.json`: start/check scripts
- `architecture.md`: architecture diagram and production design notes
- `OpsBrain-Pitch-Deck.pptx`: presentation deck
- `.vscode/tasks.json`: VS Code task to run the backend
- `run.bat`: Windows one-click launcher
- `pitch-deck.md`: editable deck outline
- `demo-video-script.md`: recording script for a two-minute demo video

## Working Backend APIs

- `GET /api/health`: backend status, indexed document count, graph link count
- `GET /api/dashboard`: complete dashboard payload for the frontend
- `GET /api/documents`: indexed document records
- `GET /api/graph`: knowledge graph relationships
- `GET /api/search?q=P-204`: document/entity search
- `POST /api/query`: RAG-style copilot answer with citations and retrieved documents
- `POST /api/ingest`: ingest a JSON document/note and update the in-memory graph
- `GET /api/maintenance/rca`: maintenance and RCA recommendations
- `GET /api/compliance/gaps`: compliance gaps and audit evidence package
- `GET /api/lessons`: lessons learned and failure intelligence

## Demo Flow

1. Open the command center.
2. Click the play button to run demo ingestion.
3. The play button calls `POST /api/ingest`, adds a field note, and updates the document grid.
4. Open Expert Copilot.
5. Ask: `Why is pump P-204 showing repeat seal failures?` The response comes from `POST /api/query`.
6. Open Maintenance RCA and show bundled corrective actions.
7. Open Compliance and show the PI-204 calibration evidence gap plus generated audit package.
8. Open Lessons Learned and show near-miss, CAPA, and expert-knowledge pattern matches.

## What It Proves

- Heterogeneous document intelligence
- Industrial entity extraction
- Knowledge graph linkage
- RAG-style cited answers
- Maintenance RCA recommendations
- Compliance gap detection
- Audit evidence packaging
- Lessons learned and failure-pattern intelligence
- Mobile-responsive user experience
