from fastapi import APIRouter

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post("/register")
def register():
    return {
        "access_token": "demo-access-token",
        "token_type": "bearer",
    }


@router.post("/login")
def login():
    return {
        "access_token": "demo-access-token",
        "token_type": "bearer",
    }


@router.get("/me")
def get_current_user():
    return {
        "id": 1,
        "name": "Sarthak Patil",
        "email": "sarthaksp301@gmail.com",
    }