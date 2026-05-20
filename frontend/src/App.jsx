import { useState } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [listening, setListening] = useState(false);

  // IMAGE DESCRIPTION
  const handleUpload = async () => {

    if (!image) {
      alert("Please select an image");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("image", image);

      const response = await axios.post(
        "https://vision-backend-vpi0.onrender.com/describe-image",
        formData
      );

      const aiDescription = response.data.description;

      setDescription(aiDescription);

      const speech = new SpeechSynthesisUtterance(
        aiDescription
      );

      speechSynthesis.speak(speech);

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    } finally {

      setLoading(false);
    }
  };

  // ASK QUESTION
  const askQuestion = async (spokenQuestion) => {

    try {

      const formData = new FormData();

      formData.append("image", image);

      formData.append("question", spokenQuestion);

      const response = await axios.post(
        "https://vision-backend-vpi0.onrender.com/ask-question",
        formData
      );

      const aiAnswer = response.data.answer;

      setAnswer(aiAnswer);

      const speech = new SpeechSynthesisUtterance(
        aiAnswer
      );

      speechSynthesis.speak(speech);

    } catch (error) {

      console.log(error);

      alert("Question answering failed");
    }
  };

  // VOICE INPUT
  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    setListening(true);

    recognition.onresult = async (event) => {

      const spokenText =
        event.results[0][0].transcript;

      setQuestion(spokenText);

      setListening(false);

      await askQuestion(spokenText);
    };

    recognition.onerror = (event) => {

      console.log(event);

      setListening(false);

      alert(
        "Voice recognition error: " + event.error
      );
    };
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FEFAE0",
        padding: "40px",
        fontFamily: "Arial",
        color: "#333",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <h1
            style={{
              fontSize: "52px",
              color: "#D4A373",
              marginBottom: "10px",
            }}
          >
            Vision Voice AI
          </h1>

          <p
            style={{
              fontSize: "18px",
            }}
          >
            AI-powered accessibility assistant
            for visually impaired users and remember KEEP THE VOLUME UP
          </p>
          <div
          style={{
            marginTop: "20px",
            backgroundColor: "#FAEDCD",
            padding: "15px",
            borderRadius: "12px",
            fontSize: "14px",
            lineHeight: "1.6",
            maxWidth: "800px",
            marginInline: "auto",
          }}
        >
          <strong>Note:</strong> This website represents
          a possible feature of a future hardware device
          designed for visually impaired users. The
          simplified interface with only three buttons
          is intentional to make interaction easier and
          more accessible.
        </div>
        </div>

        {/* MAIN CARD */}
        <div
          style={{
            backgroundColor: "#E9EDC9",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          {/* FILE INPUT */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {

                const file = e.target.files[0];

                setImage(file);

                setPreview(
                  URL.createObjectURL(file)
                );
              }}
            />

            {/* IMAGE PREVIEW */}
            {preview && (
              <img
                src={preview}
                alt="preview"
                style={{
                  width: "300px",
                  borderRadius: "15px",
                }}
              />
            )}

            {/* DESCRIBE BUTTON */}
            <button
              onClick={handleUpload}
              style={{
                backgroundColor: "#D4A373",
                border: "none",
                padding: "14px 28px",
                borderRadius: "12px",
                fontSize: "16px",
                cursor: "pointer",
                color: "white",
              }}
            >
              {loading
                ? "Analyzing..."
                : "Describe Image"}
            </button>

            {/* VOICE BUTTON */}
            <button
              onClick={startListening}
              style={{
                backgroundColor: "#CCD5AE",
                border: "none",
                padding: "14px 28px",
                borderRadius: "12px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              {listening
                ? "Listening..."
                : "Ask Question by Voice"}
            </button>
          </div>

          {/* DESCRIPTION */}
          {description && (
            <div
              style={{
                marginTop: "30px",
                backgroundColor: "#FEFAE0",
                padding: "25px",
                borderRadius: "15px",
                lineHeight: "1.8",
              }}
            >
              <h2
                style={{
                  color: "#D4A373",
                }}
              >
                Image Description
              </h2>

              <p
                style={{
                  whiteSpace: "pre-wrap",
                }}
              >
                {description}
              </p>
            </div>
          )}

          {/* QUESTION */}
          {question && (
            <div
              style={{
                marginTop: "20px",
                backgroundColor: "#FAEDCD",
                padding: "20px",
                borderRadius: "15px",
              }}
            >
              <strong>Your Question:</strong>

              <p>{question}</p>
            </div>
          )}

          {/* ANSWER */}
          {answer && (
            <div
              style={{
                marginTop: "20px",
                backgroundColor: "#CCD5AE",
                padding: "20px",
                borderRadius: "15px",
              }}
            >
              <strong>AI Answer:</strong>

              <p>{answer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;