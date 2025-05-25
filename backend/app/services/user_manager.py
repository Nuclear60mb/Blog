import uuid

from typing import Any, Dict, Optional, Union
from fastapi import Depends, Request, Response
from fastapi_users import (
    BaseUserManager,
    InvalidPasswordException,
    UUIDIDMixin,
    models,
    FastAPIUsers
)
from fastapi_users.authentication import (
    AuthenticationBackend,
    CookieTransport,
    JWTStrategy,
    Authenticator,
)

from app.database.database import User, get_user_db
from app.core.config import jwt_settings
from app.schemas.user_schemas import UserCreate, UserRead, UserUpdate


class UserManager(UUIDIDMixin, BaseUserManager[User, int]):
    reset_password_token_secret_key = jwt_settings.SECRET_KEY
    verification_token_secret_key = jwt_settings.SECRET_KEY

    async def on_after_register(self, user: User, request: Optional[Request] = None):
        print(f'User {user.id} has registered.')

    async def on_after_login(
            self,
            user: User,
            request: Optional[Request] = None,
            response: Optional[Response] = None
    ):
        print(f'User {user.id} has logged in.')

    async def validate_password(
        self,
        password: str,
        user: Union[UserCreate, User],
    ) -> None:
        if len(password) < 8:
            raise InvalidPasswordException(
                reason="Password should be at least 8 characters"
            )
        if user.email in password:
            raise InvalidPasswordException(
                reason="Password should not contain e-mail"
            )
        
    async def on_after_update(
        self,
        user: User,
        update_dict: Dict[str, Any],
        request: Optional[Request] = None,
    ):
        print(f"User {user.id} has been updated with {update_dict}.")


async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)


cookie_transport = CookieTransport(
    cookie_name='access_token',
    cookie_max_age=3600,
    cookie_secure=False
)


def get_jwt_strategy() -> JWTStrategy[models.UP, models.ID]:
    return JWTStrategy(secret=jwt_settings.SECRET_KEY, lifetime_seconds=3600)   


auth_backend = AuthenticationBackend(
    name='jwt',
    transport=cookie_transport,
    get_strategy=get_jwt_strategy
)


fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend],
)

authenticator = Authenticator(
    [auth_backend], 
    get_user_manager 
)

current_active_user = fastapi_users.current_user(active=True)
