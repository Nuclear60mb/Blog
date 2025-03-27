from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.database.models import Post
from app.schemas import PostCreate, PostUpdate


async def post_create(db: AsyncSession, post: PostCreate, user_id: int):
    new_post = Post(**post.model_dump(), user_id=user_id)
    db.add(new_post)

    await db.commit()
    await db.refresh(new_post)

    return new_post


async def post_get(db: AsyncSession, post_id: int):
    result = await db.execute(select(Post).where(Post.id == post_id))
    post = result.scalars().first()
    return post


async def posts_get(db: AsyncSession):
    result = await db.execute(select(Post))
    return result.scalars().all()


async def post_content_update(db: AsyncSession, post_id: int, post_data: PostUpdate):
    result = await db.execute(select(Post).where(Post.id == post_id))
    post = result.scalars().first()

    if not post:
        return None
    else:
        for key, value in post_data.model_dump(exclude_unset=True).items():
            setattr(post, key, value)

    await db.commit()
    await db.refresh(post)

    return post


async def post_delete(db: AsyncSession, post_id: int):
    post = await post_get(db, post_id)

    if post:
        await db.delete(post)
        await db.commit()

    return post
