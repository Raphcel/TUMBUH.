from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.settings import get_settings
from app.config.database import Base, engine
from app.api.router import api_router
# Import all models so they are registered with Base.metadata
import app.domain.models  # noqa: F401

settings = get_settings()


def create_app() -> FastAPI:
    """Application factory — creates and configures the FastAPI instance."""

    app = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # ── CORS ─────────────────────────────────────────────────
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ── Tables are managed by Alembic migrations ─────────────
    # Run:  alembic upgrade head
    # To auto-generate: alembic revision --autogenerate -m "description"

    # ── Register routes ──────────────────────────────────────
    app.include_router(api_router)

    # ── Health check ─────────────────────────────────────────
    @app.get("/health", tags=["Health"])
    def health_check():
        return {"status": "healthy", "version": settings.APP_VERSION}

    return app


app = create_app()
