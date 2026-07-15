# Orbit CRM — SaaS Landing Page + Product Inquiry System

A responsive marketing site for a fictional CRM product ("Orbit CRM"), paired with a
full inquiry-capture system: a validated React form on the frontend and a REST API
backed by MongoDB on the backend, plus a small admin dashboard to manage submissions.

## Stack

| Layer     | Technology |
|-----------|------------|
| Frontend  | React 18 + Vite, Tailwind CSS, Framer Motion, React Router |
| Backend   | Node.js + Express 4, Mongoose 8 |
| Database  | MongoDB |
| Testing   | Node's built-in test runner (`node --test`) |
| Container | Docker + docker-compose (Nginx serves the built frontend) |

## Project structure

```
orbit-crm/
├── frontend/                # React + Vite SPA
│   ├── src/
│   │   ├── components/      # Navbar, Hero, Features, Pricing, Testimonials,
│   │   │                    # FAQ, InquiryForm, ContactSales, Footer, OrbitDiagram
│   │   ├── pages/            # LandingPage, AdminDashboard
│   │   ├── context/          # ThemeContext (dark mode)
│   │   └── utils/api.js      # fetch wrapper for the inquiry API
│   └── Dockerfile
├── backend/
│   ├── models/Inquiry.js
│   ├── controllers/inquiryController.js
│   ├── routes/inquiryRoutes.js
│   ├── middleware/           # validation + lightweight admin auth
│   ├── tests/                # unit tests
│   └── Dockerfile
└── docker-compose.yml
```

## Getting started (local, without Docker)

### 1. Backend

```bash
cd backend
cp .env.example .env    # edit MONGO_URI / ADMIN_KEY as needed
npm install
npm run dev              # http://localhost:5000
```

MongoDB must be reachable at the `MONGO_URI` in `.env`. If you don't have MongoDB
installed locally, the quickest option is:

```bash
docker run -d -p 27017:27017 --name orbit-mongo mongo:7
```

The API also starts and serves `/api/health` even without a database connection —
`/api/inquiry` routes will return `503` until MongoDB is reachable.

### 2. Frontend

```bash
cd frontend
cp .env.example .env    # VITE_API_URL, defaults to /api via the Vite dev proxy
npm install
npm run dev               # http://localhost:5173
```

The dev server proxies `/api/*` to `http://localhost:5000` (see `vite.config.js`), so
you don't need to configure CORS for local development.

## Getting started (Docker)

```bash
docker-compose up --build
```

This starts MongoDB, the API (port 5000), and the frontend served by Nginx (port 80).
Visit `http://localhost`. Set a strong `ADMIN_KEY` in `docker-compose.yml` before
using this outside your own machine.

## REST API

Base URL: `/api/inquiry`

| Method | Endpoint            | Auth        | Description                          |
|--------|----------------------|-------------|---------------------------------------|
| POST   | `/api/inquiry`       | none        | Create a new inquiry                  |
| GET    | `/api/inquiry`       | admin key   | List inquiries (search/filter/paginate) |
| GET    | `/api/inquiry/:id`   | admin key   | Get a single inquiry                  |
| PATCH  | `/api/inquiry/:id`   | admin key   | Update an inquiry's status            |
| DELETE | `/api/inquiry/:id`   | admin key   | Delete an inquiry                     |
| GET    | `/api/health`        | none        | Health check + DB connection status   |

**Admin auth**: pass the header `x-admin-key: <ADMIN_KEY>`. If `ADMIN_KEY` is not set
in the backend's environment, admin routes are open (useful for local dev).

**GET query params**: `search`, `industry`, `companySize`, `status`, `page`, `limit`,
`sortBy`, `order`.

### Example: create an inquiry

```bash
curl -X POST http://localhost:5000/api/inquiry \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jordan Ellis",
    "companyName": "Acme Inc.",
    "email": "jordan@acme.com",
    "phone": "+1 555 123 4567",
    "country": "United States",
    "industry": "Technology",
    "companySize": "11-50",
    "message": "We would like a demo of Orbit CRM for our sales team."
  }'
```

## Inquiry form fields & validation

| Field         | Rule                                             |
|---------------|---------------------------------------------------|
| Full Name     | required, 2–100 characters                        |
| Company Name  | required, up to 150 characters                     |
| Email         | required, valid email format                       |
| Phone         | required, valid phone pattern (7–20 chars)          |
| Country       | required                                            |
| Industry      | required, one of a fixed list                       |
| Company Size  | required, one of a fixed list                        |
| Message       | required, 10–2000 characters                        |

Validation runs client-side (inline, on blur and on submit) **and** server-side
(`express-validator` + Mongoose schema validation), so the API rejects bad data even
if a request bypasses the UI.

## Bonus features implemented

- **Admin Dashboard** (`/admin`) — key-gated view of all inquiries with inline status
  updates and delete.
- **Search & Filters** — search by name/company/email, filter by industry, company
  size, and status; server-side pagination.
- **Dark Mode** — class-based Tailwind dark mode, toggle in the navbar and admin
  header, persisted to `localStorage`.
- **Docker Support** — `Dockerfile` for both services plus a root `docker-compose.yml`
  wiring frontend, backend, and MongoDB together.
- **Unit Testing** — backend request/validation tests using Node's built-in test
  runner (`npm test` inside `backend/`).
- **Loading / Error States** — spinner + disabled state on form submit, inline field
  errors, a success confirmation panel, and loading/empty/error states in the admin
  table.
- **Rate limiting & sanitization** — the public `POST /api/inquiry` endpoint is rate
  limited, and all input is sanitized against MongoDB operator injection.

## Design notes

The landing page uses an "orbit" motif throughout (rings, orbiting nodes) as a literal
visualization of the product's pitch — keeping leads, deals, and customers "in orbit"
around a business — rather than generic gradient/blob hero art. Typography pairs
Space Grotesk (display) with Inter (body) and JetBrains Mono for data labels, stats,
and eyebrows.

## Running tests

```bash
cd backend
npm test
```

## Deployment notes

- **Frontend**: `npm run build` in `frontend/` outputs static files to `frontend/dist`,
  deployable to Vercel, Netlify, or any static host / the provided Nginx Docker image.
- **Backend**: deployable to Render, Railway, Fly.io, or any Node host; provide
  `MONGO_URI`, `CORS_ORIGIN`, and `ADMIN_KEY` as environment variables.
