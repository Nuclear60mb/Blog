from datetime import datetime
from typing import Annotated

from sqlalchemy import Integer, String, text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.database.database import Base


# intpk = Annotated[Integer, mapped_column(primary_key=True)]

created_at = Annotated[datetime, mapped_column(server_default=text("TIMEZONE('utc', now())"))]
updated_at = Annotated[datetime, mapped_column(
    server_default=text("TIMEZONE('utc', now())"),
    onupdate=datetime.utcnow()
)]


class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String(30))
    # hashed_password: Mapped[str]
    user_bio: Mapped[str] = mapped_column(String(1024))
    user_email: Mapped[str] = mapped_column(String(100))


class Post(Base):
    __tablename__ = 'posts'

    id: Mapped[int] = mapped_column(Integer, index=True, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'))
    title: Mapped[str] = mapped_column(String(50), index=True)
    content: Mapped[str] = mapped_column(String(1024))

    created_at: Mapped[created_at]
    updated_at: Mapped[updated_at]

