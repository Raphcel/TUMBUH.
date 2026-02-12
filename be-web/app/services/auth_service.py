from datetime import datetime, timedelta

from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import HTTPException, status

from app.config.settings import get_settings
from app.domain.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate, UserUpdate, UserResponse, TokenResponse

settings = get_settings()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class AuthService:
    """Service handling authentication and authorization logic."""

    def __init__(self, user_repo: UserRepository):
        self._user_repo = user_repo

    # ── Password Utilities ───────────────────────────────────

    @staticmethod
    def hash_password(password: str) -> str:
        return pwd_context.hash(password)

    @staticmethod
    def verify_password(plain: str, hashed: str) -> bool:
        return pwd_context.verify(plain, hashed)

    # ── Token Utilities ──────────────────────────────────────

    @staticmethod
    def create_access_token(data: dict) -> str:
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

    @staticmethod
    def decode_token(token: str) -> dict:
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
            return payload
        except JWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token",
                headers={"WWW-Authenticate": "Bearer"},
            )

    # ── Business Methods ─────────────────────────────────────

    def register(self, data: UserCreate) -> TokenResponse:
        """Register a new user and return an access token."""
        existing = self._user_repo.get_by_email(data.email)
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A user with this email already exists",
            )

        user_dict = data.model_dump(exclude={"password"})
        user_dict["hashed_password"] = self.hash_password(data.password)

        user = self._user_repo.create(user_dict)
        token = self.create_access_token({"sub": str(user.id), "role": user.role.value})

        return TokenResponse(
            access_token=token,
            user=UserResponse.model_validate(user),
        )

    def login(self, email: str, password: str) -> TokenResponse:
        """Authenticate a user and return an access token."""
        user = self._user_repo.get_by_email(email)
        if not user or not self.verify_password(password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
            )

        token = self.create_access_token({"sub": str(user.id), "role": user.role.value})
        return TokenResponse(
            access_token=token,
            user=UserResponse.model_validate(user),
        )

    def get_current_user(self, token: str) -> User:
        """Decode token and return the associated user."""
        payload = self.decode_token(token)
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token payload")

        user = self._user_repo.get_by_id(int(user_id))
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
