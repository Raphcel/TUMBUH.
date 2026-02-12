import enum
from datetime import datetime

from sqlalchemy import (
    Column, Integer, String, Text, Enum, DateTime, ForeignKey
)
from sqlalchemy.orm import relationship

from app.config.database import Base


class OpportunityType(str, enum.Enum):
    INTERNSHIP = "Internship"
    FULL_TIME = "Full-time"
    SCHOLARSHIP = "Scholarship"


class Opportunity(Base):
    """Opportunity domain entity — represents jobs, internships, and scholarships."""

    __tablename__ = "opportunities"

    id: int = Column(Integer, primary_key=True, index=True)
    title: str = Column(String(300), nullable=False, index=True)
    company_id: int = Column(Integer, ForeignKey("companies.id"), nullable=False)
    type: OpportunityType = Column(Enum(OpportunityType), nullable=False)
    location: str = Column(String(200), nullable=False)
    salary: str = Column(String(100), nullable=True)
    description: str = Column(Text, nullable=True)
    requirements: str = Column(Text, nullable=True)  # Stored as JSON string
    posted_at: datetime = Column(DateTime, default=datetime.utcnow)
    deadline: datetime = Column(DateTime, nullable=True)

    created_at: datetime = Column(DateTime, default=datetime.utcnow)
    updated_at: datetime = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    company = relationship("Company", back_populates="opportunities")
    applications = relationship("Application", back_populates="opportunity")

    def __repr__(self) -> str:
        return f"<Opportunity(id={self.id}, title='{self.title}', type='{self.type}')>"
