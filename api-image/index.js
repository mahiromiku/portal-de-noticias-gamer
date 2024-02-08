const express = require('express');
const multer  = require('multer');
const path = require('path');

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), function(req, res) {
  res.send('Arquivo enviado com sucesso!');
});

app.get('/file/:filename', function (req, res) {
    const filename = req.params.filename;
    res.sendFile(path.join(__dirname, 'uploads', filename));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
