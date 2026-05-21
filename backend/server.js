const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
require("dotenv").config();

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://127.0.0.1:8000";

const app = express();

app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

app.post("/describe-image", upload.single("image"), async (req, res) => {
  try {
    const formData = new FormData();

    formData.append("file", req.file.buffer, req.file.originalname);

    const response = await axios.post(
      `${AI_SERVICE_URL}/analyze-image`,
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    res.json(response.data);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
});
app.post("/ask-question", upload.single("image"), async (req, res) => {

  try {

    const formData = new FormData();

    formData.append(
      "file",
      req.file.buffer,
      req.file.originalname
    );

    formData.append(
      "question",
      req.body.question
    );

    const response = await axios.post(
      `${AI_SERVICE_URL}/ask-question`,
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    res.json(response.data);

  } catch (error) {

    console.log(error.response?.data || error.message);

    res.status(500).json({
      error: "Question answering failed",
    });
  }
});
app.listen(5001, () => {
  console.log("Backend running on port 5001");
});