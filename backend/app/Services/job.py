from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.job import Job
from app.Schemas.job import JobCreate, JobUpdate


def get_job_by_id(db: Session, job_id: int) -> Job | None:

    result = db.execute(
        select(Job).where(Job.id == job_id)
    )

    return result.scalar_one_or_none()


def get_all_jobs(db: Session) -> list[Job]:

    result = db.execute(select(Job))

    return list(result.scalars().all())


def create_job(db: Session, job: JobCreate) -> Job:

    new_job = Job(
        title=job.title,
        company=job.company,
        location=job.location,
        description=job.description,
        salary=job.salary,
        job_type=job.job_type,
        experience_required=job.experience_required
    )

    db.add(new_job)
    db.commit()
    db.refresh(new_job)

    return new_job


def update_job(
    db: Session,
    job_id: int,
    job: JobUpdate
) -> Job | None:

    existing_job = get_job_by_id(db, job_id)

    if not existing_job:
        return None

    update_data = job.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(existing_job, key, value)

    db.commit()
    db.refresh(existing_job)

    return existing_job


def delete_job(db: Session, job_id: int) -> bool:

    job = get_job_by_id(db, job_id)

    if not job:
        return False

    db.delete(job)
    db.commit()

    return True