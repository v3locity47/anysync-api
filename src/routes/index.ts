import express from 'express';
import AuthRouter from './auth.routes';
import UserRouter from './user.routes';
import FriendRequestRouter from './friend-request.routes';

const router = express.Router();

router.use('/users', UserRouter);
router.use('/auth', AuthRouter);
router.use('/friend-request', FriendRequestRouter);

export default router;
