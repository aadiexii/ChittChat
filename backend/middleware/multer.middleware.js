import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'backend/public/uploads/');
    },
    filename: function (req, file, cb) {
        // Create a unique filename to prevent overwriting files with the same name
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

export default upload;