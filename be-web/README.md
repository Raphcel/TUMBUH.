# IPB Career Tracker — Backend API

A RESTful backend service for the **IPB Career Tracker** platform, built with **Python** and **FastAPI** following **Clean Architecture** principles.

IPB Career Tracker connects IPB University students with career opportunities — internships, full-time positions, and scholarships — posted by partner companies.

---

## Tech Stack

| Layer      | Technology                                    |
| ---------- | --------------------------------------------- |
| Framework  | FastAPI 0.115                                 |
| Language   | Python 3.10+                                  |
| ORM        | SQLAlchemy 2.0                                |
| Validation | Pydantic v2                                   |
| Auth       | JWT (python-jose) + bcrypt (passlib)          |
| Database   | SQLite (dev) — easily swappable to PostgreSQL |
| Migrations | Alembic                                       |
| Server     | Uvicorn (ASGI)                                |

---

## Architecture

The project follows **Clean Architecture** with strict layer separation:

```
Request → Routes (API) → Services (Business Logic) → Repositories (Data Access) → Database
```

Each layer only depends on the layer below it, never upward.

### Project Structure

```
be-web/
├── app/
│   ├── main.py                  # Application factory (FastAPI instance)
│   ├── __init__.py
│   │
│   ├── config/                  # Configuration & database setup
│   │   ├── settings.py          # Pydantic Settings (env vars)
│   │   └── database.py          # SQLAlchemy engine, session, Base
│   │
│   ├── domain/                  # Domain layer — entities & business rules
│   │   └── models/
│   │       ├── user.py          # User model (Student / HR roles)
│   │       ├── company.py       # Company model
│   │       ├── opportunity.py   # Opportunity model (Internship / Full-time / Scholarship)
│   │       └── application.py   # Application model (status tracking)
│   │
│   ├── schemas/                 # Pydantic DTOs — request/response validation
│   │   ├── user.py              # UserCreate, UserLogin, UserResponse, TokenResponse
│   │   ├── company.py           # CompanyCreate, CompanyUpdate, CompanyResponse
│   │   ├── opportunity.py       # OpportunityCreate, OpportunityUpdate, OpportunityResponse
│   │   └── application.py       # ApplicationCreate, StatusUpdate, ApplicationResponse
│   │
│   ├── repositories/            # Data access layer — database queries
│   │   ├── base.py              # Generic BaseRepository<T> with CRUD
│   │   ├── user_repository.py   # User-specific queries
│   │   ├── company_repository.py
│   │   ├── opportunity_repository.py
│   │   └── application_repository.py
│   │
│   ├── services/                # Business logic layer
│   │   ├── auth_service.py      # Registration, login, JWT, password hashing
│   │   ├── user_service.py      # Profile management
│   │   ├── company_service.py   # Company CRUD & search
│   │   ├── opportunity_service.py  # Opportunity CRUD, search & filters
│   │   └── application_service.py  # Apply, status updates, history tracking
│   │
│   └── api/                     # Presentation layer — HTTP interface
│       ├── router.py            # Central router (/api/v1 prefix)
│       ├── dependencies.py      # FastAPI Dependency Injection wiring
│       └── routes/
│           ├── auth.py          # POST /register, POST /login
│           ├── users.py         # GET/PUT /me, GET /{id}
│           ├── companies.py     # CRUD endpoints
│           ├── opportunities.py # CRUD + search/filter
│           └── applications.py  # Apply, list, status updates
│
├── requirements.txt             # Python dependencies
├── .env.example                 # Environment variable template
└── .gitignore
```

---

## Domain Models

### User

Represents both **Students** and **HR** staff, distinguished by a `role` enum.

| Field                          | Type         | Description         |
| ------------------------------ | ------------ | ------------------- |
| `id`                           | int          | Primary key         |
| `email`                        | str          | Unique, indexed     |
| `hashed_password`              | str          | bcrypt hash         |
| `first_name` / `last_name`     | str          | Display name        |
| `role`                         | UserRole     | `STUDENT` or `HR`   |
| `major` / `university` / `gpa` | str/float    | Student-only fields |
| `company_id`                   | FK → Company | HR-only field       |

### Company

Partner companies that post opportunities.

| Field         | Type  | Description                  |
| ------------- | ----- | ---------------------------- |
| `id`          | int   | Primary key                  |
| `name`        | str   | Unique company name          |
| `industry`    | str   | e.g. "Technology", "Finance" |
| `location`    | str   | City/region                  |
| `description` | str   | Company bio                  |
| `website`     | str   | URL                          |
| `rating`      | float | Average rating               |

### Opportunity

Job/internship/scholarship postings linked to a company.

| Field          | Type            | Description                              |
| -------------- | --------------- | ---------------------------------------- |
| `id`           | int             | Primary key                              |
| `title`        | str             | Position title                           |
| `company_id`   | FK → Company    | Owning company                           |
| `type`         | OpportunityType | `INTERNSHIP`, `FULL_TIME`, `SCHOLARSHIP` |
| `location`     | str             | Work location                            |
| `salary`       | str             | Salary range                             |
| `requirements` | str (JSON)      | List of requirements                     |
| `deadline`     | datetime        | Application deadline                     |

### Application

Tracks a student's application to an opportunity with status history.

| Field            | Type              | Description                                                     |
| ---------------- | ----------------- | --------------------------------------------------------------- |
| `id`             | int               | Primary key                                                     |
| `student_id`     | FK → User         | Applicant                                                       |
| `opportunity_id` | FK → Opportunity  | Target position                                                 |
| `status`         | ApplicationStatus | `APPLIED` → `SCREENING` → `INTERVIEW` → `ACCEPTED` / `REJECTED` |
| `history`        | str (JSON)        | Timestamped status change log                                   |

---

## API Endpoints

All routes are prefixed with `/api/v1`.

### Authentication

| Method | Endpoint         | Description         | Auth |
| ------ | ---------------- | ------------------- | ---- |
| POST   | `/auth/register` | Register a new user | —    |
| POST   | `/auth/login`    | Login, returns JWT  | —    |

### Users

| Method | Endpoint      | Description              | Auth |
| ------ | ------------- | ------------------------ | ---- |
| GET    | `/users/me`   | Get current user profile | JWT  |
| PUT    | `/users/me`   | Update profile           | JWT  |
| GET    | `/users/{id}` | Get user by ID           | JWT  |

### Companies

| Method | Endpoint          | Description        | Auth |
| ------ | ----------------- | ------------------ | ---- |
| GET    | `/companies/`     | List all companies | —    |
| GET    | `/companies/{id}` | Get company detail | —    |
| POST   | `/companies/`     | Create company     | HR   |
| PUT    | `/companies/{id}` | Update company     | HR   |
| DELETE | `/companies/{id}` | Delete company     | HR   |

### Opportunities

| Method | Endpoint                      | Description               | Auth |
| ------ | ----------------------------- | ------------------------- | ---- |
| GET    | `/opportunities/`             | List/search opportunities | —    |
| GET    | `/opportunities/{id}`         | Get opportunity detail    | —    |
| GET    | `/opportunities/company/{id}` | List by company           | —    |
| POST   | `/opportunities/`             | Create opportunity        | HR   |
| PUT    | `/opportunities/{id}`         | Update opportunity        | HR   |
| DELETE | `/opportunities/{id}`         | Delete opportunity        | HR   |

**Query parameters** for `GET /opportunities/`: `search`, `type`, `location`, `skip`, `limit`

### Applications

| Method | Endpoint                         | Description               | Auth    |
| ------ | -------------------------------- | ------------------------- | ------- |
| POST   | `/applications/`                 | Apply to opportunity      | Student |
| GET    | `/applications/me`               | My applications           | Student |
| GET    | `/applications/opportunity/{id}` | Applicants for listing    | HR      |
| PATCH  | `/applications/{id}/status`      | Update application status | HR      |

---

## Authentication & Authorization

- **JWT Bearer tokens** — sent via `Authorization: Bearer <token>` header
- **Password hashing** — bcrypt via passlib
- **Role-based access** — `require_role("HR")` / `require_role("STUDENT")` dependency guards
- Token expiry configurable via `ACCESS_TOKEN_EXPIRE_MINUTES` env var (default: 60 min)

---

## Design Patterns

| Pattern                  | Where                 | Purpose                                                  |
| ------------------------ | --------------------- | -------------------------------------------------------- |
| **Repository**           | `repositories/`       | Abstracts all database access behind a clean interface   |
| **Generic Repository**   | `base.py`             | `BaseRepository<T>` provides reusable CRUD for any model |
| **Service Layer**        | `services/`           | Encapsulates business logic, keeps routes thin           |
| **Dependency Injection** | `api/dependencies.py` | FastAPI's `Depends()` wires repos → services → routes    |
| **Application Factory**  | `main.py`             | `create_app()` builds the FastAPI instance               |
| **DTO / Schema**         | `schemas/`            | Pydantic models validate input and shape output          |

---

## Environment Variables

| Variable                      | Default                         | Description                             |
| ----------------------------- | ------------------------------- | --------------------------------------- |
| `DATABASE_URL`                | `sqlite:///./career_tracker.db` | Database connection string              |
| `SECRET_KEY`                  | —                               | JWT signing key (change in production!) |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `60`                            | Token expiry duration                   |

---

## License

This project is part of the **ADS (Analisis & Desain Sistem)** coursework at IPB University.
