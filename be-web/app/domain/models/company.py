from datetime import datetime

from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from sqlalchemy.orm import relationship

from app.config.database import Base


class Company(Base):
    """Company domain entity — represents partner companies."""

    __tablename__ = "companies"

    id: int = Column(Integer, primary_key=True, index=True)
    name: str = Column(String(200), nullable=False, index=True)
    industry: str = Column(String(100), nullable=False)
    location: str = Column(String(200), nullable=False)
    logo: str = Column(String(500), nullable=True)
    description: str = Column(Text, nullable=True)
    website: str = Column(String(500), nullable=True)
    rating: float = Column(Float, nullable=True, default=0.0)

    created_at: datetime = Column(DateTime, default=datetime.utcnow)
    updated_at: datetime = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    staff = relationship("User", back_populates="company")
    opportunities = relationship("Opportunity", back_populates="company")

    def __repr__(self) -> str:
        return f"<Company(id={self.id}, name='{self.name}')>"
