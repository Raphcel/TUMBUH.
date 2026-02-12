from fastapi import APIRouter, Depends

from app.services.auth_service import AuthService
from app.schemas.user import UserCreate, UserLogin, TokenResponse
from app.api.dependencies import get_auth_service

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=TokenResponse, status_code=201)
def register(
    data: UserCreate,
    auth_service: AuthService = Depends(get_auth_service),
):
    """Register a new user account."""
    return auth_service.register(data)


@router.post("/login", response_model=TokenResponse)
def login(
    data: UserLogin,
    auth_service: AuthService = Depends(get_auth_service),
):
    """Authenticate and receive an access token."""
    return auth_service.login(data.email, data.password)
