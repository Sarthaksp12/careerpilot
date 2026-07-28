from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    UploadFile,
    File,
)
from sqlalchemy.orm import Session
import os
import shutil
import json

from app.core.database import get_db

from app.Schemas.resume import (
    ResumeCreate,
    ResumeUpdate,
    ResumeResponse,
)

from app.Services.resume import (
    create_resume,
    get_all_resumes,
    get_resume_by_id,
    update_resume,
    delete_resume,
)

from app.ai.pdf_extractor import extract_text
from app.ai.openai_service import analyze_resume

router = APIRouter(
    prefix="/resumes",
    tags=["Resumes"],
)


# ======================================================
# Create Resume
# ======================================================

@router.post("/", response_model=ResumeResponse)
def create_new_resume(
    resume: ResumeCreate,
    db: Session = Depends(get_db)
):
    return create_resume(db, resume)


# ======================================================
# Upload Resume PDF + AI Analysis + Save to Database
# ======================================================

@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Allow only PDF
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    # Create uploads folder
    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)

    # Save PDF
    file_path = os.path.join(upload_dir, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=500,
            detail="Failed to save uploaded PDF."
        )

    # Extract text
    extracted_text = extract_text(file_path)

    if not extracted_text.strip():
        raise HTTPException(
            status_code=400,
            detail="No text could be extracted from this PDF."
        )

    # AI Analysis
    analysis = analyze_resume(extracted_text)

    # Convert Skills
    skills = analysis.get("skills", "")
    if isinstance(skills, list):
        skills = ", ".join(map(str, skills))

    # Convert Experience
    experience = analysis.get("experience", "")
    if isinstance(experience, (list, dict)):
        experience = json.dumps(experience, indent=2)

    # Convert Education
    education = analysis.get("education", "")
    if isinstance(education, (list, dict)):
        education = json.dumps(education, indent=2)

    # Save Resume
    resume_data = ResumeCreate(
        title=file.filename,
        file_name=file.filename,
        file_path=file_path,
        extracted_text=extracted_text,
        skills=skills,
        experience=experience,
        education=education,
        user_id=1
    )

    saved_resume = create_resume(db, resume_data)

    return {
        "message": "Resume uploaded successfully",
        "resume_id": saved_resume.id,
        "filename": file.filename,
        "analysis": analysis
    }


# ======================================================
# Get All Resumes
# ======================================================

@router.get("/", response_model=list[ResumeResponse])
def get_resumes(
    db: Session = Depends(get_db)
):
    return get_all_resumes(db)


# ======================================================
# Get Resume By ID
# ======================================================

@router.get("/{resume_id}", response_model=ResumeResponse)
def get_resume(
    resume_id: int,
    db: Session = Depends(get_db)
):
    resume = get_resume_by_id(db, resume_id)

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    return resume


# ======================================================
# Update Resume
# ======================================================

@router.put("/{resume_id}", response_model=ResumeResponse)
def update_existing_resume(
    resume_id: int,
    resume: ResumeUpdate,
    db: Session = Depends(get_db)
):
    updated = update_resume(
        db,
        resume_id,
        resume
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    return updated


# ======================================================
# Delete Resume
# ======================================================

@router.delete("/{resume_id}")
def delete_existing_resume(
    resume_id: int,
    db: Session = Depends(get_db)
):
    success = delete_resume(db, resume_id)

    if not success:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    return {
        "message": "Resume deleted successfully"
    }