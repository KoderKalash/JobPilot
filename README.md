# Job Pilot

> Structured resume intelligence for modern hiring pipelines.

[![Node.js](https://img.shields.io/badge/Node.js-TypeScript-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Prisma-2D3748?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Express](https://img.shields.io/badge/Express-REST%20API-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![Status](https://img.shields.io/badge/Version-1.0.0-22C55E?style=flat-square)]()

---

## Overview

Hiring decisions fail when resume screening is unstructured. **Job Pilot** replaces ad-hoc evaluation with a deterministic backend pipeline — ingesting a resume, extracting normalised skill signals, scoring fit against role expectations, and returning structured, actionable recommendations.

Each stage of the pipeline has a single, auditable responsibility. The architecture is designed to be testable today and upgradeable to NLP/LLM intelligence tomorrow — without rewriting the API layer.

---

## Pipeline

```
Upload → Parse → Extract → Match → Recommend → Store
```

| Stage | Responsibility |
|---|---|
| **Upload** | Multipart PDF ingestion via Multer |
| **Parse** | Raw text extraction via `pdf-parse` |
| **Extract** | Deterministic keyword-based skill identification |
| **Match** | Role-scoped scoring against expected skill sets |
| **Recommend** | Missing skill gaps converted to actionable guidance |
| **Store** | Prisma persistence of resume artifacts and analysis outputs |

---

## Features

- PDF resume upload via multipart API
- Text extraction pipeline with `pdf-parse`
- Deterministic skill extraction engine
- Role-based skill expectation system (`backend`, `frontend`)
- Fit scoring with matched and missing skill breakdowns
- Recommendation engine that converts gaps into concrete guidance
- Structured JSON response contracts for downstream integration

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js + TypeScript |
| Framework | Express.js |
| Database | PostgreSQL (hosted) |
| ORM | Prisma |
| File Ingestion | Multer |
| PDF Parsing | pdf-parse |

---

## Project Structure

```
jobpilot/
├── prisma/
│   └── schema.prisma             # Data model definitions
└── src/
    ├── app.ts                    # Application bootstrap
    ├── server.ts                 # Runtime startup
    ├── config/
    │   ├── db.ts                 # Database configuration
    │   └── env.ts                # Environment variables
    ├── middleware/
    │   └── error.middleware.ts   # Centralised error handling
    ├── routes/
    │   └── index.ts              # API surface and route mapping
    ├── utils/
    │   └── fileHandler.ts        # File storage, naming, and PDF filtering
    └── modules/
        └── resume/
            ├── resume.controller.ts          # HTTP validation and response contracts
            ├── resume.parser.ts              # PDF text extraction
            ├── skillExtractor.ts             # Skill identification engine
            ├── role.skills.ts                # Role-based skill expectations
            ├── matcher.engine.ts             # Fit scoring and gap analysis
            ├── recommendation.engine.ts      # Guidance generation
            └── service/
                └── resume.service.ts         # Pipeline orchestration
```

---

## API Reference

### `POST /api/resume/upload`

Upload a PDF resume for evaluation against a target role.

**Request** — `multipart/form-data`

| Field | Type | Required | Description |
|---|---|---|---|
| `file` | `PDF` | Yes | Candidate resume |
| `role` | `string` | Yes | Target role (`backend`, `frontend`) |

**Response** — `200 OK`

```json
{
  "message": "Resume uploaded successfully",
  "filePath": "uploads/1713990012345.pdf",
  "report": {
    "matchScore": 67,
    "matchedSkills": ["javascript", "typescript", "postgresql", "docker"],
    "missingSkills": ["redis", "aws", "node.js", "express"]
  },
  "recommendations": [
    "Learn Redis for caching and improving backend performance",
    "Gain familiarity with AWS for cloud deployment and scalability",
    "Deepen Node.js understanding including event loop and async patterns",
    "Build REST APIs with Express and understand middleware patterns"
  ]
}
```

### `GET /health`

Returns service status.

---

## Data Model

Two core entities underpin the persistence layer.

```
Resume ──< Analysis
```

**`Resume`** — source artifact, extracted raw text, and ingest timestamp.  
**`Analysis`** — role-scoped evaluation output: match score, matched skills, missing skills, and recommendations.

**Design decisions:**

- A `1 → many` Resume-to-Analysis relationship supports multi-role evaluation and re-analysis as scoring logic evolves.
- `rawText` is stored to enable reprocessing without re-uploading files and to preserve an auditable intermediate representation for debugging and model validation.

---

## Architecture Principles

**Separation of concerns** — Transport, orchestration, domain logic, and persistence are fully isolated layers.

**Modular pipeline** — Each stage is implemented as a replaceable, independently testable module.

**Extensibility-first** — Deterministic engines are designed to be swapped for NLP, LLM, or embedding-powered components without modifying the API contract.

**Clean response contracts** — Structured payloads enable integration with dashboards, ATS systems, and ranking services without transformation overhead.

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/your-org/jobpilot.git
cd jobpilot

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

> Requires Node.js 18+, PostgreSQL instance, and a populated `.env` file.

---

## Roadmap

| Milestone | Description |
|---|---|
| Semantic skill matching | AI/NLP extraction beyond keyword overlap |
| Resume embeddings | Vector search for contextual fit retrieval |
| Job description ingestion | First-class JD input for dynamic role expectations |
| Multi-role ranking | Comparative candidate scoring across roles |
| Async processing | Queue-based ingestion for high-throughput workloads |
| API hardening | Rate limiting, caching, and workload protection |
| Recruiter dashboard | Frontend interface for analysis visualisation and pipeline management |

---

## Licence

Kalash © 2026 Job Pilot

---

<div align="center">

*Built with engineering precision. Designed to evolve.*

</div>