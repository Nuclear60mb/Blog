import uuid

from pydantic import BaseModel, ConfigDict
from datetime import datetime

from app.schemas.user_schemas import UserRead


class PostCreate(BaseModel):
    title: str
    content: str


class PostUpdate(BaseModel):
    title: str
    content: str


class PostResponse(BaseModel):
    id: uuid.UUID
    title: str
    content: str
    author: UserRead
    author_id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)