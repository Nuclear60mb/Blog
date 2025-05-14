from pydantic import BaseModel, ConfigDict, EmailStr
from typing import Optional, List

from app.schemas.post_schemas import PostResponse


class UserRegister(BaseModel):
    username: str
    user_password: str
    user_email: EmailStr


class UserResponce(BaseModel):
    id: int
    user_email: EmailStr
    username: str
    bio: Optional[str] = None
    live: Optional[str] = None
    posts: List[PostResponse]
    posts_count: Optional[int] = 0


    model_config = ConfigDict(from_attributes=True)
