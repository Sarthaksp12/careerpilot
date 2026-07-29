from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.ai.job_search import search_live_jobs

from app.Schemas.job import (
    JobCreate,
    JobUpdate,
    JobResponse,
)

from app.Services.job import (
    get_all_jobs,
    get_job_by_id,
    create_job,
    update_job,
    delete_job,
)

router = APIRouter(
    prefix="/job",
    tags=["Job"],
)

# =====================================================
# LIVE JOB SEARCH
# =====================================================

@router.get("/search-live")
def search_jobs_live(
    query: str = Query(..., description="Search keyword"),
    page: int = 1,
):
    try:
        jobs = search_live_jobs(query, page)

        return {
            "success": True,
            "query": query,
            "count": len(jobs),
            "jobs": jobs,
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


# =====================================================
# GET ALL JOBS
# =====================================================

@router.get("/", response_model=list[JobResponse])
def read_all_jobs(
    db: Session = Depends(get_db),
):
    return get_all_jobs(db)


# =====================================================
# SEARCH LOCAL DATABASE
# =====================================================

@router.get("/search", response_model=list[JobResponse])
def search_jobs(
    query: str = Query(...),
    db: Session = Depends(get_db),
):
    jobs = get_all_jobs(db)

    query = query.lower()

    return [
        job
        for job in jobs
        if (
            query in (job.title or "").lower()
            or query in (job.company or "").lower()
            or query in (job.description or "").lower()
            or query in (job.location or "").lower()
        )
    ]


# =====================================================
# GET JOB BY ID
# =====================================================

@router.get("/{job_id}", response_model=JobResponse)
def read_job(
    job_id: int,
    db: Session = Depends(get_db),
):
    job = get_job_by_id(db, job_id)

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found",
        )

    return job


# =====================================================
# CREATE JOB
# =====================================================

@router.post("/", response_model=JobResponse)
def create_new_job(
    job: JobCreate,
    db: Session = Depends(get_db),
):
    return create_job(db, job)


# =====================================================
# UPDATE JOB
# =====================================================

@router.put("/{job_id}", response_model=JobResponse)
def update_existing_job(
    job_id: int,
    job: JobUpdate,
    db: Session = Depends(get_db),
):
    updated = update_job(db, job_id, job)

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Job not found",
        )

    return updated


# =====================================================
# DELETE JOB
# =====================================================

@router.delete("/{job_id}")
def remove_job(
    job_id: int,
    db: Session = Depends(get_db),
):
    deleted = delete_job(db, job_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Job not found",
        )

    return {
        "message": "Job deleted successfully"
    }

# =====================================================
# AI MATCH (TEMPORARILY DISABLED)
# =====================================================

"""
from app.Services.match_services import match_resume_with_job

@router.post("/{job_id}/match/{resume_id}")
def match_job(
    job_id: int,
    resume_id: int,
    db: Session = Depends(get_db),
):
    return match_resume_with_job(
        db=db,
        job_id=job_id,
        resume_id=resume_id,
    )
"""