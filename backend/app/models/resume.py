from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String, Text, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.core.database import Base

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.application import Application


class Resume(Base):
    __tablename__ = "resumes"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    title: Mapped[str] = mapped_column(String(255))

    file_name: Mapped[str] = mapped_column(String(255))

    file_path: Mapped[str] = mapped_column(String(500))

    extracted_text: Mapped[str | None] = mapped_column(Text, nullable=True)

    skills: Mapped[str | None] = mapped_column(Text, nullable=True)

    experience: Mapped[str | None] = mapped_column(Text, nullable=True)

    education: Mapped[str | None] = mapped_column(Text, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()   # was missing a default — see note below
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE")
    )

    user: Mapped["User"] = relationship(
        back_populates="resumes"
    )

    # NEW — matches Application.resume's back_populates="applications"
    applications: Mapped[list["Application"]] = relationship(
        back_populates="resume",
        cascade="all, delete-orphan"
    )