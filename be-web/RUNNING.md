# How to Run — IPB Career Tracker Backend

Step-by-step guide to get the backend API running locally.

---

## Prerequisites

- **Python 3.10+** installed ([python.org](https://www.python.org/downloads/))
- **pip** (comes with Python)
- **Git** (optional, for cloning)

Check your Python version:

```bash
python --version
```

---

## 1. Navigate to the Backend Directory

```bash
cd be-web
```

---

## 2. Create a Virtual Environment

```bash
# Create
python -m venv myenv

# Activate (Windows — PowerShell)
.\myenv\Scripts\Activate.ps1

# Activate (Windows — CMD)
myenv\Scripts\activate.bat

# Activate (macOS / Linux)
source myenv/bin/activate
```

You should see `(myenv)` in your terminal prompt when activated.

---

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

This installs: FastAPI, Uvicorn, SQLAlchemy, Pydantic, python-jose (JWT), passlib (bcrypt), and Alembic.

---

## 4. Configure Environment Variables

Copy the example env file and edit it:

```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# macOS / Linux
cp .env.example .env
```

Edit `.env` with your settings:

```dotenv
DATABASE_URL=sqlite:///./career_tracker.db
SECRET_KEY=change-this-to-a-random-secret-key
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

> **Important:** Change `SECRET_KEY` to a strong random string in production.  
> Generate one with: `python -c "import secrets; print(secrets.token_hex(32))"`

---

## 5. Run the Server

```bash
uvicorn app.main:app --reload
```

You should see output like:

```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

The `--reload` flag enables auto-reload on code changes (development only).

---

## 6. Verify It's Running

Open your browser and visit:

| URL                          | Description                                          |
| ---------------------------- | ---------------------------------------------------- |
| http://localhost:8000/health | Health check — should return `{"status": "healthy"}` |
| http://localhost:8000/docs   | **Swagger UI** — interactive API documentation       |
| http://localhost:8000/redoc  | **ReDoc** — alternative API documentation            |

---

## 7. Test the API

### Using Swagger UI (Recommended for beginners)

1. Go to http://localhost:8000/docs
2. Click on any endpoint to expand it
3. Click **"Try it out"**
4. Fill in the request body and click **"Execute"**

### Using cURL

**Register a user:**

```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@apps.ipb.ac.id",
    "password": "password123",
    "first_name": "Rafif",
    "last_name": "Farras",
    "role": "STUDENT"
  }'
```

**Login:**

```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@apps.ipb.ac.id",
    "password": "password123"
  }'
```

**Access protected endpoint (use the token from login):**

```bash
curl http://localhost:8000/api/v1/users/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Common Options

### Change the Port

```bash
uvicorn app.main:app --reload --port 8080
```

### Allow External Access

```bash
uvicorn app.main:app --reload --host 0.0.0.0
```

### Run in Production (no reload, multiple workers)

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

---

## Database

The app uses **SQLite** by default. The database file `career_tracker.db` is auto-created on first run.

To reset the database, simply delete the file:

```bash
# Windows
Remove-Item career_tracker.db

# macOS / Linux
rm career_tracker.db
```

The tables will be recreated on the next server start.

To switch to **PostgreSQL**, update `.env`:

```dotenv
DATABASE_URL=postgresql://user:password@localhost:5432/career_tracker
```

And install the driver:

```bash
pip install psycopg2-binary
```

---

## Troubleshooting

| Problem                                      | Solution                                                                |
| -------------------------------------------- | ----------------------------------------------------------------------- |
| `ModuleNotFoundError: No module named 'app'` | Make sure you're running `uvicorn` from the `be-web/` directory         |
| `No module named 'fastapi'`                  | Activate your virtual environment first: `.\myenv\Scripts\Activate.ps1` |
| Port already in use                          | Use a different port: `--port 8080`                                     |
| `.env` not found                             | Copy `.env.example` to `.env` — see step 4                              |
| `bcrypt` install error                       | Try: `pip install bcrypt` separately, then retry                        |

---

## Quick Start (TL;DR)

```bash
cd be-web
python -m venv myenv
.\myenv\Scripts\Activate.ps1          # Windows
pip install -r requirements.txt
copy .env.example .env                 # then edit SECRET_KEY
uvicorn app.main:app --reload
# → Open http://localhost:8000/docs
```
