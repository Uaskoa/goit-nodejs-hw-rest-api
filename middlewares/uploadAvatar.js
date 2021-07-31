const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const tempDir = path.join(process.cwd(), 'temp');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  linits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
