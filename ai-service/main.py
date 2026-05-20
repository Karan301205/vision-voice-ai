from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()


genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")
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
    return {"message": "AI Service Running"}

@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):

    image = Image.open(file.file)

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

    response = model.generate_content([prompt, image])

    return {
        "description": response.text
    }