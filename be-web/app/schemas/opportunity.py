from datetime import datetime
from pydantic import BaseModel, Field

from app.domain.models.opportunity import OpportunityType
from app.schemas.company import CompanyResponse


# ── Request Schemas ──────────────────────────────────────────

class OpportunityCreate(BaseModel):
    """Schema for creating a new opportunity."""
    title: str = Field(..., max_length=300)
    company_id: int
    type: OpportunityType
    location: str = Field(..., max_length=200)
    salary: str | None = None
    description: str | None = None
    requirements: list[str] | None = None
    deadline: datetime | None = None


class OpportunityUpdate(BaseModel):
    """Schema for updating an opportunity."""
    title: str | None = None
    type: OpportunityType | None = None
    location: str | None = None
    salary: str | None = None
    description: str | None = None
    requirements: list[str] | None = None
    deadline: datetime | None = None


# ── Response Schemas ─────────────────────────────────────────

class OpportunityResponse(BaseModel):
    """Schema for opportunity data in API responses."""
    id: int
    title: str
    company_id: int
    type: OpportunityType
    location: str
    salary: str | None = None
    description: str | None = None
    requirements: list[str] | None = None
    posted_at: datetime | None = None
    deadline: datetime | None = None
    company: CompanyResponse | None = None

    class Config:
        from_attributes = True


class OpportunityListResponse(BaseModel):
    """Paginated opportunity list response."""
    items: list[OpportunityResponse]
    total: int
