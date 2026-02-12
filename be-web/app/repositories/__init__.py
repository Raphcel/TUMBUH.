from app.repositories.base import BaseRepository
from app.repositories.user_repository import UserRepository
from app.repositories.company_repository import CompanyRepository
from app.repositories.opportunity_repository import OpportunityRepository
from app.repositories.application_repository import ApplicationRepository

__all__ = [
    "BaseRepository",
    "UserRepository",
    "CompanyRepository",
    "OpportunityRepository",
    "ApplicationRepository",
]
