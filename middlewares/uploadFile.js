const multer = require('multer');
const path = require('path');
const fs = require('fs');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
        const uploadPath = 'C:/Users/Lenovo/Desktop/backendFev/public/files';
        // existance de fs 
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uploadPath = 'C:/Users/Lenovo/Desktop/backendFev/public/files';
        const originalName = file.originalname;
        const fileExtension = path.extname(originalName);
        const baseName = path.basename(originalName, fileExtension);

        let fileName = originalName;
        let fileIndex = 1;

        // Check if the file already exists and append a number if it does
        while (fs.existsSync(path.join(uploadPath, fileName))) {
            fileName = `${baseName}_${fileIndex}${fileExtension}`;
            fileIndex++;
        }

        cb(null, fileName);
    }
});


const uploadFile = multer({ storage: storage });// insialisation du multer avec le storage configuration 

module.exports = uploadFile;