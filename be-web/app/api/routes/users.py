from fastapi import APIRouter, Depends

from app.domain.models.user import User
from app.services.user_service import UserService
from app.schemas.user import UserUpdate, UserResponse
from app.api.dependencies import get_current_user, get_user_service

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=UserResponse)
def get_my_profile(
    current_user: User = Depends(get_current_user),
    user_service: UserService = Depends(get_user_service),
):
    """Get the authenticated user's profile."""
    return user_service.get_profile(current_user.id)


@router.put("/me", response_model=UserResponse)
def update_my_profile(
    data: UserUpdate,
    current_user: User = Depends(get_current_user),
    user_service: UserService = Depends(get_user_service),
):
    """Update the authenticated user's profile."""
    return user_service.update_profile(current_user.id, data)


@router.get("/{user_id}", response_model=UserResponse)
def get_user(
    user_id: int,
    user_service: UserService = Depends(get_user_service),
):
    """Get a user's profile by ID."""
    return user_service.get_profile(user_id)
