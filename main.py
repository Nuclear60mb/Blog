from contextlib import asynccontextmanager
from fastapi import FastAPI

from app.routes import posts_routes
from app.database.engine import create_database


@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_database()
    yield


app = FastAPI(lifespan=lifespan)


app.include_router(posts_routes.router, prefix='/posts', tags=['Posts'])
