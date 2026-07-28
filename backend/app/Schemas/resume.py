

from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ResumeBase(BaseModel):
    title: str
    file_name: str
    file_path: str
    extracted_text: str | None = None
    skills: str | None = None
    experience: str | None = None
    education: str | None = None
    user_id: int


class ResumeCreate(ResumeBase):
    pass


class ResumeUpdate(BaseModel):
    title: str | None = None
    file_name: str | None = None
    file_path: str | None = None
    extracted_text: str | None = None
    skills: str | None = None
    experience: str | None = None
    education: str | None = None


class ResumeResponse(ResumeBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)