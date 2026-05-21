import base64
import os
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from groq import Groq

load_dotenv(override=True)


client = Groq(api_key=os.getenv("GROQ_API_KEY"))
MODEL_NAME = "meta-llama/llama-4-scout-17b-16e-instruct"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "AI Service (Groq) Running"}

@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    image_bytes = await file.read()
    base64_image = base64.b64encode(image_bytes).decode('utf-8')
    mime_type = file.content_type or "image/jpeg"
    data_url = f"data:{mime_type};base64,{base64_image}"

    prompt = """
    You are an AI assistant helping blind people understand images.

    Describe the image in a natural conversational way.

    Structure your response into:

    1. Main subject
    2. Important visual details
    3. Background/environment

    Keep sentences short and easy to understand.

    Avoid overly artistic or dramatic language.
    Focus on practical visual understanding.
    """

    completion = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": prompt
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": data_url
                        }
                    }
                ]
            }
        ]
    )

    return {
        "description": completion.choices[0].message.content
    }

@app.post("/ask-question")
async def ask_question(
    file: UploadFile = File(...),
    question: str = Form(...)
):
    image_bytes = await file.read()
    base64_image = base64.b64encode(image_bytes).decode('utf-8')
    mime_type = file.content_type or "image/jpeg"
    data_url = f"data:{mime_type};base64,{base64_image}"

    prompt = f"""
    You are helping blind people understand images.

    Answer this question about the image:

    {question}

    Keep the answer short, clear, and conversational.
    """

    completion = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": prompt
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": data_url
                        }
                    }
                ]
            }
        ]
    )

    return {
        "answer": completion.choices[0].message.content
    }