from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.engine import get_db
from app.schemas import PostUpdate, PostCreate, PostResponse
from app.crud import post_create, posts_get, post_get, post_delete, post_content_update

router = APIRouter()


@router.get('/', response_model=list[PostResponse])
async def read_posts(db: AsyncSession = Depends(get_db)):
    return await posts_get(db)


@router.get('/{post_id}', response_model=PostResponse)
async def read_post(post_id: int, db: AsyncSession = Depends(get_db)):
    post = await post_get(db, post_id)

    if not post:
        raise HTTPException(status_code=404, detail='Post was not found...')
    return post


#create post without auth
@router.post('/{user_id}', response_model=PostResponse)
async def create_post(post: PostCreate, user_id: int, db:AsyncSession = Depends(get_db),):
    return await post_create(db, post, user_id=user_id) # id = 1 for now. Plug until then add auth


@router.put('/{post_id}', response_model=PostResponse)
async def update_post(post_id: int, post_data: PostUpdate, db: AsyncSession = Depends(get_db)):
    updated_post = await post_content_update(db, post_id, post_data)

    if not updated_post:
        raise HTTPException(status_code=404, detail='Post was not found...')
    return updated_post


@router.delete('/{post_id}')
async def delete_existing_post(post_id: int, db: AsyncSession = Depends(get_db)):
    deleted_post = await post_delete(db, post_id)

    if not deleted_post:
        raise HTTPException(status_code=404, detail='Post was not found...')
    return {'message': 'Post has been deleted'}