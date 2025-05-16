import uuid
from datetime import datetime
from typing import Annotated, List
from sqlalchemy import Integer, String, text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.dialects.postgresql import UUID


class Base(DeclarativeBase):
    pass


# intpk = Annotated[Integer, mapped_column(primary_key=True)]

created_at = Annotated[datetime, mapped_column(server_default=text("TIMEZONE('utc', now())"))]
updated_at = Annotated[datetime, mapped_column(
    server_default=text("TIMEZONE('utc', now())"),
    onupdate=datetime.utcnow()
)]


class User(SQLAlchemyBaseUserTableUUID, Base):
    __tablename__ = 'users'

    username: Mapped[str] = mapped_column(String(30), nullable=True)
    user_bio: Mapped[str] = mapped_column(String(1024), nullable=True)
    live: Mapped[str] = mapped_column(String(1024), nullable=True)
    posts: Mapped[List['Post']] = relationship(back_populates="author", lazy="selectin")
    posts_count: Mapped[int] = mapped_column(Integer, nullable=True)


class Post(Base):
    __tablename__ = 'posts'

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title: Mapped[str] = mapped_column(String(50), index=True)
    content: Mapped[str] = mapped_column(String(1024))

    author_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    author: Mapped['User'] = relationship(back_populates="posts")

    created_at: Mapped[created_at]
    updated_at: Mapped[updated_at]