import multer from 'multer';
const upload = multer({dest:'uploads/'}).single('file');

 const MulterMiddleware={
    upload
}

export default MulterMiddleware