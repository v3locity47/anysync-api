import express from 'express';
// import passport from 'passport';
import {
  sendRequest,
  updateRequest,
} from '../controllers/friend-request.controller';

const router = express.Router();

router.post('/', sendRequest);
router.put('/', updateRequest);

export default router;
