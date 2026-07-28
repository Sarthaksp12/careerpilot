from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.application import Application
from app.Schemas.application import (
    ApplicationCreate,
    ApplicationUpdate,
)


def get_application_by_id(
    db: Session,
    application_id: int
) -> Application | None:

    result = db.execute(
        select(Application).where(
            Application.id == application_id
        )
    )

    return result.scalar_one_or_none()


def get_all_applications(db: Session) -> list[Application]:

    result = db.execute(select(Application))

    return list(result.scalars().all())


def create_application(
    db: Session,
    application: ApplicationCreate
) -> Application:

    new_application = Application(
        status=application.status,
        user_id=application.user_id,
        job_id=application.job_id,
        resume_id=application.resume_id
    )

    db.add(new_application)
    db.commit()
    db.refresh(new_application)

    return new_application


def update_application(
    db: Session,
    application_id: int,
    application: ApplicationUpdate
) -> Application | None:

    existing_application = get_application_by_id(
        db,
        application_id
    )

    if not existing_application:
        return None

    update_data = application.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(existing_application, key, value)

    db.commit()
    db.refresh(existing_application)

    return existing_application


def delete_application(
    db: Session,
    application_id: int
) -> bool:

    application = get_application_by_id(
        db,
        application_id
    )

    if not application:
        return False

    db.delete(application)
    db.commit()

    return True