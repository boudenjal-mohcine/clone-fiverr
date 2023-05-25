const multer = require('multer')

//mime => extension
const MIME_TYPES ={

    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png' 

};


var storage = multer.diskStorage({

    
    destination: (req, file, cb) => {
      cb(null, 'src/profiles')
    },
    filename: (req, file, cb) => {
        const name =((file.originalname.split('.')[0]).split(' ').join('_'))
        const extension = MIME_TYPES[file.mimetype];
        cb(null,name+Date.now()+'.'+extension)
        
    }
});


module.exports = multer({storage: storage}).single('image');