from fastapi import APIRouter, status

router=APIRouter()
@router.get("/health")
async def health_check():
    return {"status": "healthy","service": "AI Backend"}    