from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends, HTTPException
from sqlalchemy.future import select

from app.database.engine import get_db
from app.database.models import User
from app.schemas.user_schemas import UserRegister, UserResponce
from app.core.security import hash_password, verify_password


async def create_user(db: AsyncSession, user_in: UserRegister) -> UserResponce:
    user_dict = user_in.model_dump(exclude={'user_password'})
    user_dict['user_password'] = hash_password(user_in.user_password)
    user_dict['user_email'] = user_in.user_email

    user = User(**user_dict)

    db.add(user)
    await db.commit()
    await db.refresh(user)

    return UserResponce.model_validate(user, from_attributes=True)


async def get_user_by_id(db: AsyncSession, user_id: int):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()
    return user


async def get_user_by_username(db: AsyncSession, username: str):
    result = await db.execute(select(User).where(User.username == username))
    user = result.scalars().first()
    return user


async def get_user_by_email(db: AsyncSession, user_email: str):
    result = await db.execute(select(User).where(User.user_email == user_email))
    user = result.scalars().first()
    return user


async def auth_user(db: AsyncSession, username: str, password: str):
    user = await get_user_by_username(username, db)

    if not user:
        raise HTTPException(status_code=401, detail='User not found')
    if not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=401, detail='incorrect password')
    return user
