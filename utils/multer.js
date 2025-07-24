const multer = require('multer');
const path = require('path');
const fs = require('fs');
// const { log } = require('winston');

// Configure dynamic storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Example: dynamic folder based on fieldname or req.body.type
    let folder = 'uploads/default';
// console.log("multer file:",file);

    if (file.fieldname === 'infoimage') {
      folder = 'uploads/infoimages';
    } else if (file.fieldname === 'courseimage') {
      folder = 'uploads/courses';
    } else if (file.fieldname === 'shopimage') {
      folder = 'uploads/shops';
    }

    // Ensure folder exists
    fs.mkdirSync(folder, { recursive: true });

    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

module.exports = upload;
