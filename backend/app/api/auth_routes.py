from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.user_schemas import UserRegister, UserResponce
from app.services.user_func import get_user_by_id, get_user_by_username, create_user, auth_user
from app.core.security import verify_password, create_access_token
from app.database.engine import get_db



router = APIRouter()


@router.post('/register', response_model=UserResponce)
async def register(user: UserRegister, db: AsyncSession = Depends(get_db)):
    # if await get_user_by_username(db, user.username):
    #     raise HTTPException(status_code=401, detail='Username already registered')
    return await create_user(db, user)


@router.post('/login')
async def login(user_in: UserRegister, responce: Response, db: AsyncSession = Depends(get_db)):
    user = await auth_user(user_in.username,user_in.user_password, db)

    if not user:
        raise HTTPException(status_code=401, detail='invalid credits')
    
    access_token = create_access_token(data={'sub': user.id})

    responce.set_cookie(
        key='access_token',
        value=access_token,
        httponly=True,
        max_age= 1800,
        path='/'
    )

    return {'message': 'Login successful'}


@router.post('/logout')
async def logout(responce: Response):
    await responce.delete_cookie('access_token', path='/')
    return {'message': 'logged out'}