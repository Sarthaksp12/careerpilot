from fastapi import APIRouter

router = APIRouter(
    prefix="/applications",
    tags=["Applications"],
)


@router.get("/")
def get_all_applications():
    pass


@router.get("/{application_id}")
def get_application(application_id: int):
    pass


@router.post("/")
def apply_job():
    pass


@router.put("/{application_id}")
def update_application(application_id: int):
    pass


@router.delete("/{application_id}")
def delete_application(application_id: int):
    pass 