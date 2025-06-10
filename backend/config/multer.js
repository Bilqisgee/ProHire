// config/multer.js
import multer from 'multer';

const storage = multer.memoryStorage(); // Stores file in memory instead of disk

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed!'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

export default upload;