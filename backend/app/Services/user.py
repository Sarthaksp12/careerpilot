from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.user import User
from app.Schemas.user import UserCreate, UserUpdate


def get_user_by_email(db: Session, email: str) -> User | None:
    """Return a user if the email already exists, else None."""
    result = db.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()


def get_user_by_clerk_id(db: Session, clerk_user_id: str) -> User | None:
    """
    Look up a user by their Clerk ID — this is how we'll identify
    'who is making this request' on every authenticated route.
    """
    result = db.execute(select(User).where(User.clerk_user_id == clerk_user_id))
    return result.scalar_one_or_none()


def get_user_by_id(db: Session, user_id: int) -> User | None:
    """Get a user by their internal database ID."""
    result = db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()


def get_all_users(db: Session) -> list[User]:
    """Return all users. (We'll add pagination once this list grows.)"""
    result = db.execute(select(User))
    return list(result.scalars().all())


def create_user(db: Session, user: UserCreate) -> User:
    """
    Create and save a new user. Called after we verify a Clerk token
    for a user we haven't seen before.
    """
    db_user = User(
        name=user.name,
        email=user.email,
        clerk_user_id=user.clerk_user_id,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)  # re-fetch to get DB-generated fields (id, created_at)
    return db_user


def update_user(
    db: Session, user_id: int, updated_data: UserUpdate
) -> User | None:
    """
    Update an existing user. Only overwrites fields the client
    actually sent (uses UserUpdate, not UserCreate).
    """
    db_user = get_user_by_id(db, user_id)
    if not db_user:
        return None

    # exclude_unset=True: only touch fields the client actually provided
    for field, value in updated_data.model_dump(exclude_unset=True).items():
        setattr(db_user, field, value)

    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: Session, user_id: int) -> User | None:
    """Delete a user (and their resumes, via cascade)."""
    db_user = get_user_by_id(db, user_id)
    if not db_user:
        return None

    db.delete(db_user)
    db.commit()
    return db_user