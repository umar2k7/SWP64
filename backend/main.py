import os
import uuid

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from dotenv import load_dotenv

from pydantic import BaseModel
from typing import List

from generate import generate

load_dotenv()

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Question(BaseModel):
    text: str
    max_score: int


class FormData(BaseModel):
    title: str
    date: str
    questions: List[Question]


@app.get("/")
def read_root():
    return {"message": "hey, swp64 project!!", "key": os.getenv("API_KEY")}

@app.post("/api/form")
async def receive_form(data: FormData):
    form_id = str(uuid.uuid4())[:8]
    file_path = f"variants/form_{form_id}.pdf"

    generate(data.title, data.date, data.questions, form_id)

    return {"file_url": f"/api/download-pdf/{form_id}"}


@app.get("/api/download-pdf/{form_id}")
def download_pdf(form_id: str):
    file_path = f"variants/form_{form_id}.pdf"
    if os.path.exists(file_path):
        return FileResponse(file_path, media_type='application/pdf', filename=f"form_{form_id}.pdf")
    return {"error": "Файл не найден"}
