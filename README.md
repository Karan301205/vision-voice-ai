# Vision Voice AI 

An AI-powered accessibility assistant designed for visually impaired users.  
Vision Voice AI helps users understand images through intelligent scene descriptions and interactive voice-based question answering.

---

## Live Demo

### Frontend
https://vision-voice-ai.vercel.app

### Backend API
https://vision-backend-vpi0.onrender.com

### AI Service
https://vision-voice-ai.onrender.com

---

# Features

Upload images for AI analysis  
AI-generated scene descriptions  
Voice narration using browser speech synthesis  
Ask questions about uploaded images through voice  
AI answers contextual image-based questions  
Accessibility-focused minimal interface  
Microservice-based architecture  
Fully deployed full-stack AI application  

---

# Project Idea

This project was built with accessibility in mind.

The website represents a possible feature of a future hardware device designed for visually impaired users.  
The simplified interface with minimal controls is intentional to make interaction easier and more accessible.

---

# Example Workflow

1. User uploads an image  
2. AI describes the scene aloud  
3. User asks:
   > "What color is the dress?"  
4. AI answers contextually based on the image  
5. AI speaks the answer aloud  

---

# Tech Stack

## Frontend
- React (Vite)
- Axios
- Web Speech API
- CSS Inline Styling

## Backend
- Node.js
- Express.js
- Multer

## AI Service
- FastAPI
- Gemini Vision API
- Pillow (PIL)

## Deployment
- Vercel (Frontend)
- Render (Backend + AI Service)

---

# Architecture

```text
React Frontend
      ↓
Express Backend
      ↓
FastAPI AI Service
      ↓
Gemini Vision API
```

---

# Core AI Capabilities

## Image Understanding
The AI analyzes uploaded images and explains:
- Main subject
- Important visual details
- Background/environment

## Voice Interaction
Users can:
- Listen to descriptions
- Ask questions through voice
- Receive spoken AI responses

---

# Local Setup

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/vision-voice-ai.git
cd vision-voice-ai
```

---

# 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 3. Backend Setup

```bash
cd backend
npm install
node server.js
```

---

# 4. AI Service Setup

```bash
cd ai-service

python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload
```

---

# Environment Variables

Create `.env` inside `ai-service/`

```env
GEMINI_API_KEY=your_api_key
```

---

# Deployment

## Frontend
Deployed on Vercel

## Backend
Deployed on Render

## AI Service
Deployed on Render

---

# Why This Project Stands Out

This project demonstrates:
- Multimodal AI systems
- Accessibility-focused design
- AI + Voice integration
- Full-stack development
- Microservice architecture
- Real-world AI deployment

---

# Future Improvements

- Real-time camera narration
- OCR text reading
- Multi-language support
- Conversation memory
- Local/open-source vision models
- Hardware integration

---

# Author

Built by Karan Rawat  
AI/ML & Full Stack Developer

