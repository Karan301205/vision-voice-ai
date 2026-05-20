const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
require("dotenv").config();

const app = express();

app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

app.post("/describe-image", upload.single("image"), async (req, res) => {
  try {
    const formData = new FormData();

    formData.append("file", req.file.buffer, req.file.originalname);

    const response = await axios.post(
      "http://127.0.0.1:8000/analyze-image",
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

app.listen(5001, () => {
  console.log("Backend running on port 5001");
});