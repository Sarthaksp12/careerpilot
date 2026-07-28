from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.resume import Resume
from app.Schemas.resume import ResumeCreate, ResumeUpdate


def get_resume_by_id(db: Session, resume_id: int) -> Resume | None:
    result = db.execute(
        select(Resume).where(Resume.id == resume_id)
    )
    return result.scalar_one_or_none()


def get_all_resumes(db: Session) -> list[Resume]:
    result = db.execute(select(Resume))
    return list(result.scalars().all())


def create_resume(db: Session, resume: ResumeCreate) -> Resume:

    new_resume = Resume(
        title=resume.title,
        file_name=resume.file_name,
        file_path=resume.file_path,
        extracted_text=resume.extracted_text,
        skills=resume.skills,
        education=resume.education,
        experience=resume.experience,
        user_id=resume.user_id
    )

    db.add(new_resume)
    db.commit()
    db.refresh(new_resume)

    return new_resume


def update_resume(
    db: Session,
    resume_id: int,
    resume: ResumeUpdate
) -> Resume | None:

    existing_resume = get_resume_by_id(db, resume_id)

    if not existing_resume:
        return None

    update_data = resume.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(existing_resume, key, value)

    db.commit()
    db.refresh(existing_resume)

    return existing_resume


def delete_resume(db: Session, resume_id: int) -> bool:

    resume = get_resume_by_id(db, resume_id)

    if not resume:
        return False

    db.delete(resume)
    db.commit()

    return True