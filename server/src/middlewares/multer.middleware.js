import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage, 
    limits: { fileSize: 10000000 }, //  limit file size to 10MB
    fileFilter: (req, file, cb) => {
 
    cb(null, true);
  },
})