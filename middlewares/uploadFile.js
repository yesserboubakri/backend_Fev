const multer = require('multer');
const path =require('path');
const fs = require('fs');

var storage = multer.diskStorage({
    destination : function(req,res,cb){
        cb(null,"public/files")
    },
    filename:function(req,res,cb){
        const uploadPath = 'public/files';
        const originalName = file.originalname;
        const fileExtension = path.extname(originalName);
        const filename = originalName;
        
        //verifier si le fichier existe deja 
        let fileIndex = 1;
        while(fs.existsSync(path.join(uploadPath, filename))){
            const baseName = path.basename(originalName,fileExtension);
            fileName =`${baseName}_${fileIndex}${fileExtension}`;
            fileIndex++;
        }
        cb(null,filename)
    }
})
const uploadfile = multer({storage : storage})
module.exports = uploadfile

