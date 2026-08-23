from fastapi import FastAPI
from sqlalchemy.exc import OperationalError
from fastapi.middleware.cors import CORSMiddleware

from app.api import health
from app.api.routes import auth, job, resume, application
from app.core.config import settings
from app.models import User, Resume, Job, Application
from app.core.database import Base, engine
from app.api.routes import user


app = FastAPI(
    title=settings.APP_NAME,
    version="0.1.0",
)


# ======================================================
# CORS
# ======================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://confident-amazement-production.up.railway.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ======================================================
# Routes
# ======================================================

app.include_router(
    health.router,
    prefix="/api/v1",
    tags=["health"],
)

app.include_router(auth.router)
app.include_router(user.router)
app.include_router(job.router)
app.include_router(resume.router)
app.include_router(application.router)


# ======================================================
# Database
# ======================================================

@app.on_event("startup")
def create_tables_on_startup():
    try:
        Base.metadata.create_all(bind=engine)
    except OperationalError:
        pass


# ======================================================
# Root
# ======================================================

@app.get("/")
async def root():
    return {
        "message": "Welcome to CareerPilot AI"
    }