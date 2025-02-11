const multer = require('multer');
const path =require('path');
const fs = require('fs');

var storage = multer.diskStorage({
    destination : function(req,res,cb){
        cb(null,"public/files")
    },
    filename:function(req,res,cb){
        const uploadPath = 'public/files';
        const originalName = this.filename.originalName;
        const fileExtension = path.extname(originalName);
    }
});
