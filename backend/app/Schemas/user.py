from datetime import datetime
from pydantic import BaseModel, ConfigDict, EmailStr


class UserBase(BaseModel):
    name: str
    email: EmailStr


# Used when Clerk sends us a new user (via webhook) or when we
# create our own record after verifying a Clerk token for the first time.
class UserCreate(UserBase):
    clerk_user_id: str


# All fields optional — user can update just their name, just their
# email, or both, without resending everything.
class UserUpdate(BaseModel):
    name: str | None = None
    email: EmailStr | None = None


# What we actually send back to the frontend. No password field —
# there never was one, and there never will be.
class UserResponse(UserBase):
    id: int
    clerk_user_id: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)