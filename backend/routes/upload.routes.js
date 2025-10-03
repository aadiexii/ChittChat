// backend/routes/upload.routes.js

import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import upload from '../middleware/multer.middleware.js';
import { uploadFile } from '../controllers/upload.controller.js';

const router = express.Router();

// This route will handle POST requests to /api/upload
// 1. `protectRoute` ensures the user is logged in.
// 2. `upload.single('file')` processes a single file upload from a form field named 'file'.
// 3. `uploadFile` is the controller that runs after the file is uploaded.
router.post('/', protectRoute, upload.single('file'), uploadFile);

export default router;