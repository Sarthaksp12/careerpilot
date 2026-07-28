from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.core.database import Base

if TYPE_CHECKING:
    from app.models.resume import Resume
    from app.models.user import User
    from app.models.job import Job


class Application(Base):
    __tablename__ = "applications"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    status: Mapped[str] = mapped_column(
        String(50),
        default="Applied"
    )

    applied_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE")
    )

    job_id: Mapped[int] = mapped_column(
        ForeignKey("job.id", ondelete="CASCADE")
    )

    resume_id: Mapped[int] = mapped_column(
        ForeignKey("resumes.id", ondelete="CASCADE")
    )

    user: Mapped["User"] = relationship(
        back_populates="applications"
    )

    job: Mapped["Job"] = relationship(
        back_populates="applications"
    )

    resume: Mapped["Resume"] = relationship(
        back_populates="applications"
    )