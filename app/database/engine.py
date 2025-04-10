from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

from app.config import settings
from app.database.database import Base


engine = create_async_engine(
    url=settings.DATABASE_URL,
    echo=True
)


Session = async_sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)


async def create_database():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def drop_database():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


async def get_db():
    async with Session() as session:
        yield session