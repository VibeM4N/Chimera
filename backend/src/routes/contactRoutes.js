import express from 'express';
import { submitContact, getContactStatus } from '../controllers/contactController.js';

const router = express.Router();

router.post('/', submitContact);
router.get('/status/:ticketId', getContactStatus);

export default router;
