import json
import os

import google.generativeai as genai
from dotenv import load_dotenv
from sqlalchemy.orm import Session

from app.Services.job import get_job_by_id
from app.Services.resume import get_resume_by_id

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


def match_resume_with_job(
    db: Session,
    job_id: int,
    resume_id: int
):
    # -----------------------------
    # Get Job
    # -----------------------------
    job = get_job_by_id(db, job_id)

    if not job:
        return {
            "error": "Job not found"
        }

    # -----------------------------
    # Get Resume
    # -----------------------------
    resume = get_resume_by_id(db, resume_id)

    if not resume:
        return {
            "error": "Resume not found"
        }

    # -----------------------------
    # Debug Output
    # -----------------------------
    print("=" * 80)
    print("JOB DETAILS")
    print("Title:", job.title)
    print("Company:", job.company)
    print("Description:", job.description)

    print("=" * 80)
    print("RESUME DETAILS")
    print("Skills:", resume.skills)
    print("Experience:", resume.experience)
    print("Education:", resume.education)

    if resume.extracted_text:
        print("Extracted Text:")
        print(resume.extracted_text[:500])
    else:
        print("Extracted Text: None")

    print("=" * 80)

    # -----------------------------
    # Gemini Prompt
    # -----------------------------
    prompt = f"""
You are an expert ATS recruiter.

Compare the candidate's resume with the given job description.

Job Title:
{job.title}

Company:
{job.company}

Job Description:
{job.description}

Candidate Resume (Raw Text):
{resume.extracted_text}

Parsed Skills:
{resume.skills}

Parsed Experience:
{resume.experience}

Parsed Education:
{resume.education}

Analyze the resume against the job.

Return ONLY valid JSON.

{{
    "match_score": 0,
    "matched_skills": [],
    "missing_skills": [],
    "strengths": [],
    "suggestions": []
}}
"""

    # -----------------------------
    # Gemini Response
    # -----------------------------
    response = model.generate_content(prompt)

    result = response.text.strip()

    if result.startswith("```json"):
        result = result.replace("```json", "").replace("```", "").strip()

    elif result.startswith("```"):
        result = result.replace("```", "").strip()

    # -----------------------------
    # Convert JSON
    # -----------------------------
    try:
        return json.loads(result)

    except Exception:
        return {
            "error": "Gemini returned invalid JSON",
            "raw_response": result
        }