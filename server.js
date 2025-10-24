const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');
  res.send(`File uploaded successfully: ${req.file.filename}`);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));