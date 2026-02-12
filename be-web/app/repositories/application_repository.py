from sqlalchemy.orm import Session, joinedload

from app.domain.models.application import Application, ApplicationStatus
from app.repositories.base import BaseRepository


class ApplicationRepository(BaseRepository[Application]):
    """Repository for Application entity — handles all application data access."""

    def __init__(self, db: Session):
        super().__init__(Application, db)

    def get_by_student(self, student_id: int, skip: int = 0, limit: int = 100) -> list[Application]:
        """Retrieve all applications submitted by a student."""
        return (
            self._db.query(Application)
            .options(joinedload(Application.opportunity))
            .filter(Application.student_id == student_id)
            .order_by(Application.applied_at.desc())
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_by_opportunity(self, opportunity_id: int, skip: int = 0, limit: int = 100) -> list[Application]:
        """Retrieve all applications for a given opportunity."""
        return (
            self._db.query(Application)
            .options(joinedload(Application.student))
            .filter(Application.opportunity_id == opportunity_id)
            .order_by(Application.applied_at.desc())
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_by_student_and_opportunity(self, student_id: int, opportunity_id: int) -> Application | None:
        """Check if a student has already applied to an opportunity."""
        return (
            self._db.query(Application)
            .filter(
                Application.student_id == student_id,
                Application.opportunity_id == opportunity_id,
            )
            .first()
        )

    def count_by_opportunity(self, opportunity_id: int) -> int:
        """Count applications for a given opportunity."""
        return (
            self._db.query(Application)
            .filter(Application.opportunity_id == opportunity_id)
            .count()
        )

    def count_by_status(self, opportunity_id: int, status: ApplicationStatus) -> int:
        """Count applications for an opportunity filtered by status."""
        return (
            self._db.query(Application)
            .filter(
                Application.opportunity_id == opportunity_id,
                Application.status == status,
            )
            .count()
        )
