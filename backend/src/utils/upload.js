const { now } = require('mongoose');
const filterImage = require('../middleware/image.middleware')
const multer = require('multer');


const fileStorage =multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'src/images');
    },
    filename:(req,file,cb)=>{
        cb(null ,Date.now() + '_'+file.originalname )
       
    } 
   
})

const upload = multer({storage:fileStorage,fileFilter:filterImage}).single('demo_image')


module.exports=upload;