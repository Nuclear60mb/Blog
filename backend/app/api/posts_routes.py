import uuid

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from sqlalchemy.future import select

from app.database.database import get_db
from app.schemas.post_schemas import PostUpdate, PostCreate, PostResponse
from app.database.models import Post, User
from app.services.user_manager import current_active_user

router = APIRouter()


@router.get('/{post_id}', response_model=PostResponse)
async def get_post(post_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Post).where(Post.id == post_id))
    post = result.scalars().first()
    return post


@router.get('/', response_model=List[PostResponse])
async def get_posts(
    # limit: int = Query(10, ge=10),
    # offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Post))
    posts = result.scalars().all()
    return [PostResponse.model_validate(post) for post in posts]


@router.post('/create_post', response_model=PostResponse)
async def create_post(
    post: PostCreate,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_db),

):
    new_post = Post(**post.model_dump(), author_id=user.id, author=user)
    db.add(new_post)

    await db.commit()
    await db.refresh(new_post)

    return new_post


@router.put('/{post_id}', response_model=PostResponse)
async def update_post(
    post_id: uuid.UUID,
    post_data: PostUpdate,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_db)
):

    result = await db.execute(select(Post).where(Post.id == post_id))
    post = result.scalars().first()

    if not post:
        raise HTTPException(status_code=404, detail='Post was not found...')
    elif post.author_id != user.id:
        raise HTTPException(
            status_code=403, detail='You are not allowed to update this post...')
    else:
        for key, value in post_data.model_dump(exclude_unset=True).items():
            setattr(post, key, value)

    await db.commit()
    await db.refresh(post)

    return post


@router.delete('/{post_id}')
async def delete_post(
    post_id: uuid.UUID,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_db)
):

    result = await db.execute(select(Post).where(Post.id == post_id))
    post = result.scalars().first()

    if not post:
        raise HTTPException(status_code=404, detail='Post was not found...')
    elif post.author_id != user.id:
        raise HTTPException(
            status_code=403, detail='You are not allowed to delete this post...')
    else:
        await db.delete(post)
        await db.commit()

    return {'message': 'Post has been deleted'}
