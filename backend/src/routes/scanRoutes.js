import express from 'express';
import { scanURL, scanEmail, getScanHistory } from '../controllers/scanController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/url', protect, scanURL);
router.post('/email', protect, scanEmail);
router.get('/history', protect, getScanHistory);

export default router;
