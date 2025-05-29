import uuid

from fastapi import APIRouter, Depends, Query
from typing import List

from app.schemas.post_schemas import PostUpdate, PostCreate, PostResponse, PaginatedPostsResponse
from app.database.models import User
from app.services.user_manager import current_active_user
from app.dependencies import get_post_service
from app.services.post_service import PostService

router = APIRouter()


@router.get('/user_post/{post_id}', response_model=PostResponse)
async def get_user_post(post_id: uuid.UUID, service: PostService = Depends(get_post_service)):
    return await service.get_post_by_id(post_id)


@router.get('/', response_model=PaginatedPostsResponse)
async def get_posts(
    service: PostService = Depends(get_post_service),
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0)):
    items, total = await service.get_all_posts(offset=offset, limit=limit)
    return {
        'items': [PostResponse.from_orm(item) for item in items],
        'limit': limit,
        'offset': offset,
        'total': total
    }

@router.get('/user_posts', response_model=List[PostResponse])
async def get_user_posts(
    user: User = Depends(current_active_user),
    service: PostService = Depends(get_post_service),
):
    return await service.get_user_posts(user)


@router.post('/create_post', response_model=PostResponse)
async def create_post(
    post_data: PostCreate,
    user: User = Depends(current_active_user),
    service: PostService = Depends(get_post_service)
):

    return await service.create_post(
        post_data=post_data,
        user=user
    )


@router.put('/update_post/{post_id}', response_model=PostResponse)
async def update_post(
    post_id: uuid.UUID,
    post_update: PostUpdate,
    user: User = Depends(current_active_user),
    service: PostService = Depends(get_post_service)
):
    return await service.update_post(
        post_id=post_id,
        post_update=post_update
    )


@router.delete('/delete_post/{post_id}')
async def delete_post(
    post_id: uuid.UUID,
    service: PostService = Depends(get_post_service)
):
    await service.delete_post(post_id=post_id)
    return {'message': 'Post has been deleted'}
