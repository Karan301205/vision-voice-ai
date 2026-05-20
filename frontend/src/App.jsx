import { useState } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

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
        "http://localhost:5001/describe-image",
        formData
      );

      const aiDescription = response.data.description;

      setDescription(aiDescription);

      // SPEAK RESPONSE
      const speech = new SpeechSynthesisUtterance(aiDescription);

      speech.rate = 1;
      speech.pitch = 1;
      speech.volume = 1;

      speechSynthesis.speak(speech);

    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1>AI Vision for Accessibility</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />

      <button onClick={handleUpload}>
        {loading ? "Analyzing..." : "Describe Image"}
      </button>

      {description && (
        <div
          style={{
            maxWidth: "700px",
            padding: "20px",
            border: "1px solid gray",
            borderRadius: "10px",
            whiteSpace: "pre-wrap",
          }}
        >
          {description}
        </div>
      )}
    </div>
  );
}

export default App;