from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.settings import get_settings
from app.config.database import Base, engine
from app.api.router import api_router

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

    # ── Create tables ────────────────────────────────────────
    Base.metadata.create_all(bind=engine)

    # ── Register routes ──────────────────────────────────────
    app.include_router(api_router)

    # ── Health check ─────────────────────────────────────────
    @app.get("/health", tags=["Health"])
    def health_check():
        return {"status": "healthy", "version": settings.APP_VERSION}

    return app


app = create_app()
