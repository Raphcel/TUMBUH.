from datetime import datetime
from pydantic import BaseModel

from app.domain.models.application import ApplicationStatus
from app.schemas.opportunity import OpportunityResponse
from app.schemas.user import UserResponse


# ── Nested Schemas ───────────────────────────────────────────

class StatusHistoryItem(BaseModel):
    """Single entry in an application's status history."""
    status: str
    date: str


# ── Request Schemas ──────────────────────────────────────────

class ApplicationCreate(BaseModel):
    """Schema for submitting a new application."""
    opportunity_id: int


class ApplicationStatusUpdate(BaseModel):
    """Schema for updating an application's status (by HR)."""
    status: ApplicationStatus


# ── Response Schemas ─────────────────────────────────────────

class ApplicationResponse(BaseModel):
    """Schema for application data in API responses."""
    id: int
    student_id: int
    opportunity_id: int
    status: ApplicationStatus
    applied_at: datetime
    history: list[StatusHistoryItem] | None = None
    opportunity: OpportunityResponse | None = None
    student: UserResponse | None = None

    class Config:
        from_attributes = True


class ApplicationListResponse(BaseModel):
    """Paginated application list response."""
    items: list[ApplicationResponse]
    total: int
