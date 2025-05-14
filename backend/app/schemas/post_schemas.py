from pydantic import BaseModel, ConfigDict, EmailStr
from datetime import datetime


class PostCreate(BaseModel):
    title: str
    content: str
    # user_id: int


class PostUpdate(BaseModel):
    content: str


class PostResponse(BaseModel):
    id: int
    title: str
    content: str
    user_id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)