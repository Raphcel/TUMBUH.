# IPB Career Tracker — Database Documentation

This document describes the PostgreSQL database schema, relationships, migrations, seed data, and how to inspect or manage the database.

---

## Connection Details

| Property | Value                                                            |
| -------- | ---------------------------------------------------------------- |
| Engine   | PostgreSQL 15+                                                   |
| Host     | `localhost`                                                      |
| Port     | `5432`                                                           |
| Database | `career_tracker`                                                 |
| User     | `postgres`                                                       |
| URL      | `postgresql://postgres:<password>@localhost:5432/career_tracker` |

The connection string is set via the `DATABASE_URL` environment variable in `.env`.

---

## ER Diagram

```
┌──────────────┐       ┌──────────────────┐       ┌──────────────────┐
│  companies   │       │   opportunities  │       │   applications   │
├──────────────┤       ├──────────────────┤       ├──────────────────┤
│ id       PK  │◄──┐   │ id           PK  │◄──┐   │ id           PK  │
│ name         │   │   │ title            │   │   │ student_id   FK──────┐
│ industry     │   │   │ company_id   FK──┘   │   │ opportunity_id FK──┘ │
│ location     │   │   │ type             │   │   │ status           │   │
│ logo         │   │   │ location         │   │   │ applied_at       │   │
│ description  │   │   │ salary           │   │   │ history (JSON)   │   │
│ website      │   │   │ description      │   │   │ created_at       │   │
│ rating       │   │   │ requirements     │   │   │ updated_at       │   │
│ employee_cnt │   │   │ is_active        │   │   └──────────────────┘   │
│ founded_year │   │   │ posted_at        │   │                         │
│ linkedin_url │   │   │ deadline         │   │   ┌──────────────────┐   │
│ instagram_url│   │   │ created_at       │   │   │    bookmarks     │   │
│ tagline      │   │   │ updated_at       │   │   ├──────────────────┤   │
│ created_at   │   │   └──────────────────┘   │   │ id           PK  │   │
│ updated_at   │   │                          │   │ user_id      FK──────┤
└──────────────┘   │   ┌──────────────────┐   │   │ opportunity_id FK──┘ │
       ▲           │   │      users       │   │   │ created_at       │   │
       │           │   ├──────────────────┤   │   │ UNIQUE(user,opp) │   │
       │           │   │ id           PK  │◄──┼───┴──────────────────┘   │
       │           │   │ email            │   │                         │
       └───────────┼───│ company_id   FK  │   │   ┌──────────────────┐   │
                   │   │ hashed_password  │   │   │   externships   │   │
                   │   │ first_name       │   │   ├──────────────────┤   │
                   │   │ last_name        │   │   │ id           PK  │   │
                   │   │ role             │   │   │ student_id   FK──────┘
                   │   │ avatar           │   │   │ title            │
                   │   │ phone            │   │   │ company          │
                   │   │ bio              │   │   │ duration         │
                   │   │ nim              │   │   │ description      │
                   │   │ major            │   │   │ status           │
                   │   │ university       │   │   │ created_at       │
                   │   │ gpa              │   │   │ updated_at       │
                   │   │ cv_url           │   │   └──────────────────┘
                   │   │ is_active        │   │
                   │   │ created_at       │   │
                   │   │ updated_at       │   │
                   │   └──────────────────┘   │
                   │           │              │
                   │           ▼              │
                   │     staff (HR users)     │
                   │     applications ────────┘
                   │     bookmarks
                   └──── externships
```

### Relationships Summary

| Relationship               | Type        | FK Column                     | Cascade            |
| -------------------------- | ----------- | ----------------------------- | ------------------ |
| Company → Opportunities    | One-to-Many | `opportunities.company_id`    | all, delete-orphan |
| Company ← User (HR staff)  | One-to-Many | `users.company_id`            | —                  |
| User → Applications        | One-to-Many | `applications.student_id`     | all, delete-orphan |
| Opportunity → Applications | One-to-Many | `applications.opportunity_id` | all, delete-orphan |
| User → Bookmarks           | One-to-Many | `bookmarks.user_id`           | all, delete-orphan |
| Opportunity → Bookmarks    | One-to-Many | `bookmarks.opportunity_id`    | all, delete-orphan |
| User → Externships         | One-to-Many | `externships.student_id`      | all, delete-orphan |

---

## Tables in Detail

### `users`

| Column            | Type         | Constraints                        | Notes             |
| ----------------- | ------------ | ---------------------------------- | ----------------- |
| `id`              | INTEGER      | PK, auto-increment, indexed        |                   |
| `email`           | VARCHAR(255) | NOT NULL, UNIQUE, indexed          |                   |
| `hashed_password` | VARCHAR(255) | NOT NULL                           | bcrypt hash       |
| `first_name`      | VARCHAR(100) | NOT NULL                           |                   |
| `last_name`       | VARCHAR(100) | NOT NULL                           |                   |
| `role`            | ENUM         | NOT NULL, default `student`        | `student` or `hr` |
| `avatar`          | VARCHAR(500) | nullable                           | Avatar image URL  |
| `phone`           | VARCHAR(20)  | nullable                           |                   |
| `bio`             | TEXT         | nullable                           |                   |
| `nim`             | VARCHAR(20)  | nullable, indexed                  | Student ID number |
| `major`           | VARCHAR(200) | nullable                           | Student only      |
| `university`      | VARCHAR(200) | nullable, default `IPB University` |                   |
| `gpa`             | FLOAT        | nullable                           | Student only      |
| `cv_url`          | VARCHAR(500) | nullable                           |                   |
| `company_id`      | INTEGER      | FK → `companies.id`, nullable      | HR only           |
| `is_active`       | BOOLEAN      | NOT NULL, default `true`           |                   |
| `created_at`      | TIMESTAMP    | auto-set on create                 |                   |
| `updated_at`      | TIMESTAMP    | auto-set on create/update          |                   |

### `companies`

| Column           | Type         | Constraints                 | Notes          |
| ---------------- | ------------ | --------------------------- | -------------- |
| `id`             | INTEGER      | PK, auto-increment, indexed |                |
| `name`           | VARCHAR(200) | NOT NULL, indexed           |                |
| `industry`       | VARCHAR(100) | NOT NULL                    |                |
| `location`       | VARCHAR(200) | NOT NULL                    |                |
| `logo`           | VARCHAR(500) | nullable                    | Logo image URL |
| `description`    | TEXT         | nullable                    |                |
| `website`        | VARCHAR(500) | nullable                    |                |
| `rating`         | FLOAT        | nullable, default `0.0`     |                |
| `employee_count` | INTEGER      | nullable                    |                |
| `founded_year`   | INTEGER      | nullable                    |                |
| `linkedin_url`   | VARCHAR(500) | nullable                    |                |
| `instagram_url`  | VARCHAR(500) | nullable                    |                |
| `tagline`        | VARCHAR(300) | nullable                    |                |
| `created_at`     | TIMESTAMP    | auto-set on create          |                |
| `updated_at`     | TIMESTAMP    | auto-set on create/update   |                |

### `opportunities`

| Column         | Type         | Constraints                       | Notes                                    |
| -------------- | ------------ | --------------------------------- | ---------------------------------------- |
| `id`           | INTEGER      | PK, auto-increment, indexed       |                                          |
| `title`        | VARCHAR(300) | NOT NULL, indexed                 |                                          |
| `company_id`   | INTEGER      | FK → `companies.id`, NOT NULL     |                                          |
| `type`         | ENUM         | NOT NULL                          | `Internship`, `Full-time`, `Scholarship` |
| `location`     | VARCHAR(200) | NOT NULL                          |                                          |
| `salary`       | VARCHAR(100) | nullable                          |                                          |
| `description`  | TEXT         | nullable                          |                                          |
| `requirements` | TEXT         | nullable                          | JSON array stored as string              |
| `is_active`    | BOOLEAN      | NOT NULL, default `true`, indexed |                                          |
| `posted_at`    | TIMESTAMP    | auto-set on create                |                                          |
| `deadline`     | TIMESTAMP    | nullable                          |                                          |
| `created_at`   | TIMESTAMP    | auto-set on create                |                                          |
| `updated_at`   | TIMESTAMP    | auto-set on create/update         |                                          |

### `applications`

| Column           | Type      | Constraints                       | Notes                                                       |
| ---------------- | --------- | --------------------------------- | ----------------------------------------------------------- |
| `id`             | INTEGER   | PK, auto-increment, indexed       |                                                             |
| `student_id`     | INTEGER   | FK → `users.id`, NOT NULL         |                                                             |
| `opportunity_id` | INTEGER   | FK → `opportunities.id`, NOT NULL |                                                             |
| `status`         | ENUM      | NOT NULL, default `Applied`       | `Applied`, `Screening`, `Interview`, `Accepted`, `Rejected` |
| `applied_at`     | TIMESTAMP | auto-set on create                |                                                             |
| `history`        | TEXT      | nullable                          | JSON array of `{status, date}`                              |
| `created_at`     | TIMESTAMP | auto-set on create                |                                                             |
| `updated_at`     | TIMESTAMP | auto-set on create/update         |                                                             |

### `bookmarks`

| Column           | Type      | Constraints                                          | Notes |
| ---------------- | --------- | ---------------------------------------------------- | ----- |
| `id`             | INTEGER   | PK, auto-increment, indexed                          |       |
| `user_id`        | INTEGER   | FK → `users.id` (CASCADE), NOT NULL, indexed         |       |
| `opportunity_id` | INTEGER   | FK → `opportunities.id` (CASCADE), NOT NULL, indexed |       |
| `created_at`     | TIMESTAMP | auto-set on create                                   |       |

**Constraint:** `UNIQUE(user_id, opportunity_id)` — prevents duplicate bookmarks.

### `externships`

| Column        | Type         | Constraints                                  | Notes                    |
| ------------- | ------------ | -------------------------------------------- | ------------------------ |
| `id`          | INTEGER      | PK, auto-increment, indexed                  |                          |
| `student_id`  | INTEGER      | FK → `users.id` (CASCADE), NOT NULL, indexed |                          |
| `title`       | VARCHAR(300) | NOT NULL                                     |                          |
| `company`     | VARCHAR(200) | NOT NULL                                     | Organization name        |
| `duration`    | VARCHAR(50)  | nullable                                     | e.g. "6 months"          |
| `description` | TEXT         | nullable                                     |                          |
| `status`      | ENUM         | NOT NULL, default `Ongoing`                  | `Ongoing` or `Completed` |
| `created_at`  | TIMESTAMP    | auto-set on create                           |                          |
| `updated_at`  | TIMESTAMP    | auto-set on create/update                    |                          |

---

## Enums

| Enum Name           | Values                                                      | Used In               |
| ------------------- | ----------------------------------------------------------- | --------------------- |
| `UserRole`          | `student`, `hr`                                             | `users.role`          |
| `OpportunityType`   | `Internship`, `Full-time`, `Scholarship`                    | `opportunities.type`  |
| `ApplicationStatus` | `Applied`, `Screening`, `Interview`, `Accepted`, `Rejected` | `applications.status` |
| `ExternshipStatus`  | `Ongoing`, `Completed`                                      | `externships.status`  |

---

## Migrations (Alembic)

Migrations are managed by [Alembic](https://alembic.sqlalchemy.org/) and stored in `alembic/versions/`.

### Applied Migrations

| Revision       | Description                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------ |
| `0b4bae5b7920` | Initial tables (users, companies, opportunities, applications)                                   |
| `489bb7154375` | Expand schema — add bookmarks, externships tables + new columns on users/companies/opportunities |

### Common Commands

```bash
# Activate the virtual environment first
cd be-web
.\myenv\Scripts\activate          # Windows
# source myenv/bin/activate       # macOS/Linux

# Check current migration status
alembic current

# Apply all pending migrations
alembic upgrade head

# Roll back one migration
alembic downgrade -1

# Roll back to a specific revision
alembic downgrade 0b4bae5b7920

# Generate a new migration after model changes
alembic revision --autogenerate -m "describe_your_changes"

# View migration history
alembic history
```

---

## Seed Data

The seed script (`scripts/seed.py`) populates the database with realistic mock data matching the frontend.

### Running the Seed Script

```bash
cd be-web
.\myenv\Scripts\activate
python -m scripts.seed
```

> **Note:** The seed script clears all existing data before inserting. Run with caution on non-development databases.

### Seeded Accounts

All accounts use password: **`password123`**

#### Students

| Email                         | Name         | NIM         | Major                     | GPA  |
| ----------------------------- | ------------ | ----------- | ------------------------- | ---- |
| `budi.santoso@apps.ipb.ac.id` | Budi Santoso | G6401201001 | Ilmu Komputer             | 3.85 |
| `dewi.lestari@apps.ipb.ac.id` | Dewi Lestari | G1501211045 | Statistika dan Sains Data | 3.72 |
| `andi.pratama@apps.ipb.ac.id` | Andi Pratama | J0310201021 | Teknik Komputer           | 3.60 |

#### HR Staff

| Email              | Name           | Company        |
| ------------------ | -------------- | -------------- |
| `hr@tokopedia.com` | Siti Aminah    | Tokopedia      |
| `hr@gojek.com`     | Rina Wulandari | Gojek          |
| `hr@bi.go.id`      | Ahmad Fauzi    | Bank Indonesia |

### Seeded Companies

| ID  | Name             | Industry           | Location        |
| --- | ---------------- | ------------------ | --------------- |
| 101 | Tokopedia        | E-Commerce         | Jakarta Selatan |
| 102 | Gojek            | Technology         | Jakarta Selatan |
| 103 | Bank Indonesia   | Finance            | Jakarta Pusat   |
| 104 | Bukalapak        | E-Commerce         | Jakarta Selatan |
| 105 | Telkom Indonesia | Telecommunications | Bandung         |

### Seeded Opportunities

| ID  | Title                    | Company          | Type        |
| --- | ------------------------ | ---------------- | ----------- |
| 1   | Software Engineer Intern | Tokopedia        | Internship  |
| 2   | Data Analyst Associate   | Gojek            | Full-time   |
| 3   | Beasiswa Bank Indonesia  | Bank Indonesia   | Scholarship |
| 4   | Backend Developer        | Bukalapak        | Full-time   |
| 5   | UI/UX Design Intern      | Tokopedia        | Internship  |
| 6   | Network Engineer Intern  | Telkom Indonesia | Internship  |

---

## How to Inspect the Database

### Option 1: psql (Command Line)

```bash
# Connect to the database
psql -U postgres -d career_tracker

# List all tables
\dt

# Describe a table's structure
\d users
\d opportunities

# Count rows in each table
SELECT 'users' AS tbl, COUNT(*) FROM users
UNION ALL SELECT 'companies', COUNT(*) FROM companies
UNION ALL SELECT 'opportunities', COUNT(*) FROM opportunities
UNION ALL SELECT 'applications', COUNT(*) FROM applications
UNION ALL SELECT 'bookmarks', COUNT(*) FROM bookmarks
UNION ALL SELECT 'externships', COUNT(*) FROM externships;

# View all users
SELECT id, email, first_name, last_name, role FROM users;

# View opportunities with company names
SELECT o.id, o.title, c.name AS company, o.type, o.location
FROM opportunities o
JOIN companies c ON o.company_id = c.id;

# View applications with status
SELECT a.id, u.first_name || ' ' || u.last_name AS student,
       o.title AS opportunity, a.status
FROM applications a
JOIN users u ON a.student_id = u.id
JOIN opportunities o ON a.opportunity_id = o.id;

# View bookmarks with opportunity titles
SELECT b.id, u.email, o.title AS opportunity
FROM bookmarks b
JOIN users u ON b.user_id = u.id
JOIN opportunities o ON b.opportunity_id = o.id;

# View externships
SELECT e.id, u.first_name || ' ' || u.last_name AS student,
       e.title, e.company, e.status
FROM externships e
JOIN users u ON e.student_id = u.id;

# Exit psql
\q
```

### Option 2: pgAdmin

1. Open pgAdmin and connect to your local PostgreSQL server
2. Navigate to **Servers → PostgreSQL → Databases → career_tracker → Schemas → public → Tables**
3. Right-click any table → **View/Edit Data → All Rows**

### Option 3: API (Swagger UI)

1. Start the server: `uvicorn app.main:app --reload`
2. Open **http://localhost:8000/docs** in your browser
3. Use the interactive Swagger UI to test any endpoint
4. For authenticated endpoints, click **Authorize** and enter a JWT token from `/auth/login`

### Option 4: VS Code Extensions

- **SQLTools** + **SQLTools PostgreSQL Driver** — query the database directly from VS Code
- **Database Client** — visual table browser and query editor

---

## Troubleshooting

### "Connection refused" when running the app

Make sure PostgreSQL is running:

```bash
# Windows — check service
Get-Service -Name "postgresql*"

# Start if stopped
Start-Service -Name "postgresql-x64-17"   # adjust version number
```

### "Database does not exist"

Create the database manually:

```bash
psql -U postgres -c "CREATE DATABASE career_tracker;"
```

Then apply migrations:

```bash
alembic upgrade head
```

### Migration conflicts

If you get migration errors after pulling new code:

```bash
# Check current state
alembic current

# Re-apply from scratch (destructive!)
alembic downgrade base
alembic upgrade head
python -m scripts.seed
```

### Reset everything

```bash
# Drop and recreate the database
psql -U postgres -c "DROP DATABASE IF EXISTS career_tracker;"
psql -U postgres -c "CREATE DATABASE career_tracker;"

# Apply all migrations
alembic upgrade head

# Re-seed data
python -m scripts.seed
```
