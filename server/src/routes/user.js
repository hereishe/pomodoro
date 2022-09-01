import express from 'express';
import {Register, Login, Auth, Refresh, Logout} from '../controllers/auth.controller.js';

var router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.get('/verify', Auth);
router.post('/refresh', Refresh);
router.post('/logout', Logout);

export default router;