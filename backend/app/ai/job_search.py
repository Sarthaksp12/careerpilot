import os
import requests
from dotenv import load_dotenv

load_dotenv()

RAPID_API_KEY = os.getenv("RAPID_API_KEY")

url = "https://jsearch.p.rapidapi.com/search-v2"


def search_live_jobs(query: str, page: int = 1):

    querystring = {
        "query": query,
        "num_pages": "1",
        "country": "country",
        "date_posted": "all",
    }

    headers = {
        "x-rapidapi-key": RAPID_API_KEY,
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
        "Content-Type": "application/json",
    }

    response = requests.get(
        url,
        headers=headers,
        params=querystring,
    )

    print("STATUS:", response.status_code)

    response.raise_for_status()

    data = response.json()

    jobs = []

    for job in data["data"]["jobs"]:

        jobs.append({
            "job_id": job.get("job_id"),
            "title": job.get("job_title"),
            "company": job.get("employer_name"),
            "location": ", ".join(filter(None, [
                job.get("job_city"),
                job.get("job_state"),
                job.get("job_country"),
            ])),
            "employment_type": job.get("job_employment_type"),
            "salary": job.get("job_salary"),
            "description": job.get("job_description"),
            "apply_link": job.get("job_apply_link"),
            "logo": job.get("employer_logo"),
        })

    return jobs