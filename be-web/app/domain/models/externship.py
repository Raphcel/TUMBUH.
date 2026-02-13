import enum
from datetime import datetime

from sqlalchemy import (
    Column, Integer, String, Text, Enum, DateTime, ForeignKey
)
from sqlalchemy.orm import relationship

from app.config.database import Base


class ExternshipStatus(str, enum.Enum):
    ONGOING = "Ongoing"
    COMPLETED = "Completed"


class Externship(Base):
    """Externship entity — represents a student's manual externship/project entry."""

    __tablename__ = "externships"

    id: int = Column(Integer, primary_key=True, index=True)
    student_id: int = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    title: str = Column(String(300), nullable=False)
    company: str = Column(String(200), nullable=False)
    duration: str = Column(String(100), nullable=True)
    description: str = Column(Text, nullable=True)
    status: ExternshipStatus = Column(
        Enum(ExternshipStatus), nullable=False, default=ExternshipStatus.ONGOING
    )

    created_at: datetime = Column(DateTime, default=datetime.utcnow)
    updated_at: datetime = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    student = relationship("User", back_populates="externships")

    def __repr__(self) -> str:
        return f"<Externship(id={self.id}, title='{self.title}', student_id={self.student_id})>"
