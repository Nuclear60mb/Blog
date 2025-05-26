import uuid

from typing import List

from app.schemas.post_schemas import PostUpdate, PostCreate, PostResponse
from app.database.models import User
from app.repository.post_repository import PostRepository


class PostService:
    def __init__(self, repo: PostRepository):
        self.repo = repo

    async def create_post(self, post_data: PostCreate, user: User) -> PostResponse:
        return await self.repo.create_post(post_data, user)
    
    async def get_post_by_id(self, post_id: uuid.UUID) -> PostResponse:
        return await self.repo.get_post_by_id(post_id)
    
    async def get_all_posts(self) -> List[PostResponse]:
        return await self.repo.get_all_posts()
    
    async def get_user_posts(self, user: User) -> List[PostResponse]:
        return await self.repo.get_user_posts(user)
    
    async def update_post(self, post_id: uuid.UUID, post_update: PostUpdate) -> PostResponse:
        return await self.repo.update_post(post_id, post_update)
    
    async def delete_post(self, post_id: uuid.UUID) -> dict:
        return await self.repo.delete_post(post_id)
    
