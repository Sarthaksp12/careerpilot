import os
import json

import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


def analyze_resume(text: str):

    prompt = f"""
You are an expert ATS Resume Analyzer and Resume Parser.

Analyze the resume below.

Return ONLY valid JSON.

Do not return markdown.
Do not return explanations.
Do not wrap the JSON inside ```.

Return exactly this structure:

{{
    "full_name": "",
    "email": "",
    "phone": "",
    "summary": "",

    "skills": [],

    "experience": [],

    "education": [],

    "projects": [],

    "certifications": [],

    "languages": [],

    "ats_score": 0,

    "strengths": [],

    "weaknesses": [],

    "missing_keywords": [],

    "suggestions": []
}}

Rules:

- ats_score should be between 0 and 100.
- strengths should contain resume strengths.
- weaknesses should contain resume weaknesses.
- missing_keywords should contain important missing ATS keywords.
- suggestions should contain improvements to increase ATS score.
- summary should be a professional summary of the candidate.

Resume:

{text}
"""

    response = model.generate_content(prompt)

    result = response.text.strip()

    # Remove markdown if Gemini returns ```json
    if result.startswith("```json"):
        result = result.replace("```json", "").replace("```", "").strip()

    elif result.startswith("```"):
        result = result.replace("```", "").strip()

    try:
        return json.loads(result)

    except Exception:
        return {
            "error": "Invalid JSON returned by Gemini",
            "raw_response": result
        }