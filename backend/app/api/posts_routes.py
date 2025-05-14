from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.database.engine import get_db
from app.schemas.post_schemas import PostUpdate, PostCreate, PostResponse
from app.services.posts_func import create_post, get_post, get_posts, delete_post, post_content_update

router = APIRouter()


@router.get('/', response_model=List[PostResponse])
async def read_posts_route(db: AsyncSession = Depends(get_db)):
    return await get_posts(db)


@router.get('/{post_id}', response_model=PostResponse)
async def read_post_route(post_id: int, db: AsyncSession = Depends(get_db)):
    post = await get_post(db, post_id)

    if not post:
        raise HTTPException(status_code=404, detail='Post was not found...')
    return post


#create post without auth
@router.post('/{user_id}', response_model=PostResponse)
async def create_post_route(post: PostCreate, user_id: int, db:AsyncSession = Depends(get_db),):
    return await create_post(db, post, user_id=user_id) # admins user id = 3. Plug until ill add auth


@router.put('/{post_id}', response_model=PostResponse)
async def update_post_route(post_id: int, post_data: PostUpdate, db: AsyncSession = Depends(get_db)):
    updated_post = await post_content_update(db, post_id, post_data)

    if not updated_post:
        raise HTTPException(status_code=404, detail='Post was not found...')
    return updated_post


@router.delete('/{post_id}')
async def delete_post_route(post_id: int, db: AsyncSession = Depends(get_db)):
    deleted_post = await delete_post(db, post_id)

    if not deleted_post:
        raise HTTPException(status_code=404, detail='Post was not found...')
    return {'message': 'Post has been deleted'}