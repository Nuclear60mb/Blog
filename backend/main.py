from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi_users.router import get_users_router
from fastapi.responses import JSONResponse

from app.services.user_manager import get_user_manager
from app.api import posts_routes
from app.database.database import create_database
from app.services.user_manager import auth_backend, fastapi_users
from app.schemas.user_schemas import UserCreate, UserRead, UserUpdate
from app.services.user_manager import authenticator
from app.exceptions import AppException

users_router = get_users_router(
    get_user_manager,
    UserRead,
    UserUpdate,
    authenticator
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_database()
    yield


app = FastAPI(lifespan=lifespan)


@app.exception_handler(AppException)
async def app_exception_handler(request: Request, exc: AppException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(posts_routes.router, prefix='/posts', tags=['Posts'])
app.include_router(users_router, prefix='/users', tags=['Users'])

app.include_router(fastapi_users.get_auth_router(auth_backend), prefix='/auth', tags=['Auth'])

app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix='/auth',
    tags=['Auth']
)

app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)
