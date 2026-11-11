# HCM Lite

> Simple HR records for small teams.

HCM Lite is a lightweight, client-side Human Capital Management (HR) workspace for small teams. Track daily attendance, manage leave requests, maintain employee records, and view monthly payslips — all without a heavy backend setup. Data is stored in the browser's `localStorage`, so there's no server to deploy.

![HCM Lite screenshot](https://img.shields.io/badge/status-stable-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## Project Description

HCM Lite is a straightforward HR workspace designed for small teams that need to keep track of people records without the complexity of a full-scale HRIS. It provides two role-based views:

- **Admins** — add/remove employees, view today's attendance, approve or reject leave requests, post announcements, and adjust company settings.
- **Employees** — check in/out, submit leave requests, review attendance and leave history, and open monthly payslips.

A built-in "Smart Helper" chat widget answers plain-language questions (e.g., "how many on leave today?") from current data.

### What you can do

| Area | Capability |
|------|------------|
| Attendance | Daily check-in/check-out, late arrivals, presence status |
| Leave | Requests with pending/approved/rejected states |
| Payroll | Monthly payslip view with salary, deductions, net pay |
| People | Employee roster, search by name or department |
| Helper | Role-aware Q&A from live data |

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Markup | HTML5 | — |
| Styling | CSS3 (custom properties, responsive grid) | — |
| Logic | Vanilla JavaScript (ES6+) | — |
| Storage | Browser `localStorage` | — |
| Fonts | Bricolage Grotesque, Instrument Sans (Google Fonts) | — |

**No build step, no framework, no server.** Open `index.html` in a modern browser and start using it.

## Project Architecture

HCM Lite is a client-side, multi-page web application. Each feature lives in its own HTML page under `pages/`, with shared logic in modular JS files under `js/` and shared styles in `css/style.css`.

```
Browser
└── localStorage (hcm_company, hcm_users, hcm_attendance, hcm_leaves, hcm_session, hcm_ann)
    ▲
    ├── js/storage.js   — CRUD over localStorage
    ├── js/auth.js      — company setup, login, roles, session
    ├── js/employees.js — employee roster CRUD
    ├── js/attendance.js — check-in/out records
    ├── js/leave.js     — leave request lifecycle
    └── js/helper.js    — Smart Helper Q&A engine
```

Pages are served statically; navigation is via standard anchor links. Role-based gating (`requireRole`) redirects unauthenticated or unauthorized users back to the landing page.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- No Node.js, no build tools, no server required

### Installation

1. Clone the repository:

```bash
git clone https://github.com/sheikh-mohammad/hcm-lite-beginner.git
cd hcm-lite-beginner
```

2. Open `index.html` in your browser:

```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### First-time setup

1. Open `index.html` → click **Open workspace** or **Sign in**.
2. Since no company exists yet, you'll see the **Create company** form.
3. Enter your company name, admin name, email, and password.
4. Click **Create company** — you're signed in as admin and redirected to the admin dashboard.
5. Subsequent visits go straight to the sign-in form.

## Project Structure

```
hcm-lite-beginner/
├── index.html              # Landing page (public homepage)
├── css/
│   └── style.css           # Shared styles (variables, components, pages)
├── js/
│   ├── storage.js          # localStorage wrapper (Store API)
│   ├── auth.js             # Auth, company setup, session, roles
│   ├── employees.js        # Employee roster logic
│   ├── attendance.js       # Attendance check-in/out
│   ├── leave.js            # Leave request lifecycle
│   └── helper.js           # Smart Helper Q&A + chat widget UI
├── pages/
│   ├── login.html          # Sign in / company setup
│   ├── admin.html          # Admin dashboard (roster, attendance, leave approvals)
│   ├── employee.html       # Employee dashboard (check-in, leave, payslip)
│   ├── employees.html      # Employee list view
│   ├── employee.html       # Single employee detail
│   ├── leaves.html         # Leave requests view
│   ├── payslip.html        # Monthly payslip view
│   └── settings.html       # Company settings
├── docs/
│   └── prd.md              # Product requirements document
├── README.md               # This file
└── skills-lock.json        # Opencode skills lock
```

## Key Features

- **Attendance tracking** — daily check-in/check-out with late/absent/present status
- **Leave management** — submit, approve, reject requests; track leave balance
- **Employee roster** — add/remove employees, search by name or department
- **Payslips** — monthly breakdown of salary, deductions, net pay
- **Smart Helper** — chat widget answering questions from live data (role-aware)
- **Announcements & settings** — admin posts announcements, configures work days, grace period, leave quota
- **Role-based access** — admin vs employee views with route guards
- **Zero backend** — all data persisted in browser `localStorage`

## Development Workflow

### Branching strategy

Work off `main`. Create feature branches for new work:

```bash
git checkout -b feature/your-feature-name
```

### Making changes

1. Edit HTML/CSS/JS files directly — no build step needed.
2. Refresh the browser to see changes.
3. Commit with a descriptive message:

```bash
git add .
git commit -m "Add: short description of change"
git push origin feature/your-feature-name
```

Open a pull request against `main` for review.

### Coding standards

- Use semantic HTML5 elements (`<main>`, `<section>`, `<article>`, `<header>`, `<footer>`).
- CSS: BEM-ish utility classes, CSS custom properties (`--color-*`, `--radius-*`) in `:root`.
- JavaScript: vanilla ES6+, module-style files under `js/`, globals exposed on `window` where needed for inline HTML handlers.
- Keep functions small and single-purpose; prefer `const`/`let`, arrow functions for callbacks, template literals.
- Responsive design: mobile-first with `@media` breakpoints at 960px and 720px.

## Testing

There is no formal test suite. Verify changes manually:

1. Open `index.html` in the browser.
2. Complete company setup (or sign in with existing credentials).
3. Walk through each role: admin (roster, approvals, settings) and employee (check-in, leave, payslip).
4. Test the Smart Helper with sample questions.
5. Confirm responsive layout on narrow viewports.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repo and create a feature branch from `main`.
2. Follow the coding standards above.
3. Add or update pages under `pages/` and logic under `js/` as needed.
4. Test manually in the browser.
5. Open a pull request with a clear description of changes.

For guidance on code style and patterns, reference the existing files in `js/` and `css/style.css`.

## License

This project is unlicensed. All rights reserved unless a license is added.

---

*HCM Lite — Simple HR records for small teams.*
