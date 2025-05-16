import uuid

from fastapi_users import schemas
from typing import List, Optional
from pydantic import EmailStr

from app.schemas.post_schemas import PostResponse


class UserCreate(schemas.BaseUserCreate):
    pass

class UserRead(schemas.BaseUser[uuid.UUID]):
    username: Optional[str] = None
    user_bio: Optional[str] = None
    live: Optional[str] = None
    posts: List[PostResponse] = []
    posts_count: Optional[int] = 0



class UserUpdate(schemas.BaseUserUpdate):
    username: Optional[str] = None
    bio: Optional[str] = None
    live: Optional[str] = None
    posts: List[PostResponse] = []
    posts_count: Optional[int] = 0


