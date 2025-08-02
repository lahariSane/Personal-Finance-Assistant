import express from 'express';
import multer from 'multer';
import receiptUploadHandler from '../controllers/receiptController.js';
import isLoggedIn from '../middleware/isLoggedIn.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// POST /upload
router.post('/upload', isLoggedIn, upload.single('receipt'), receiptUploadHandler);

export default router;