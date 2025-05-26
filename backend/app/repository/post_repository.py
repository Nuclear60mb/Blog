import uuid

from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from sqlalchemy.future import select

from app.schemas.post_schemas import PostResponse, PostUpdate, PostCreate
from app.database.models import Post, User



class PostRepository:
    def __init__(self, db: AsyncSession):
        self.db = db


    async def get_post_by_id(self, post_id: uuid.UUID) -> Post:
        result = await self.db.execute(select(Post).where(Post.id == post_id))
        post = result.scalars().first()
        return post

    async def get_all_posts(self) -> List[Post]:
        result = await self.db.execute(select(Post))
        posts = result.scalars().all()
        return [PostResponse.model_validate(post) for post in posts]

    async def get_user_posts(self, user: User) -> List[Post]:
        result = await self.db.execute(select(Post).where(Post.author_id == user.id))
        posts = result.scalars().all()
        return [PostResponse.model_validate(post) for post in posts]

    async def create_post(self, post: PostCreate, user: User) -> Post:
        new_post = Post(**post.model_dump(), author_id=user.id, author=user)

        self.db.add(new_post)
        await self.db.commit()
        await self.db.refresh(new_post)

        return new_post
    
    async def update_post(self, post_id: uuid.UUID, post_update: PostUpdate) -> Post:
        result = await self.db.execute(select(Post).where(Post.id == post_id))
        post = result.scalars().first()

        for key, value in post_update.model_dump(exclude_unset=True).items():
            setattr(post, key, value)

        await self.db.commit()
        await self.db.refresh(post)

        return post
        
    async def delete_post(self, post_id: uuid.UUID) -> dict:
        result = await self.db.execute(select(Post).where(Post.id == post_id))
        post = result.scalars().first()

        await self.db.delete(post)
        await self.db.commit()

        return {'message': 'Post has been deleted'}
