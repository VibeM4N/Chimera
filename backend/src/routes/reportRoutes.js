import express from 'express';
import { submitReport, getReports, getReportById, updateReport, upvoteReport } from '../controllers/reportController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, submitReport);
router.get('/', protect, getReports);
router.get('/:id', protect, getReportById);
router.put('/:id', protect, updateReport);
router.post('/:id/upvote', protect, upvoteReport);

export default router;
