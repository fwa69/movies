// 'backend/routes/userRoutes.js'

import express from 'express';
// 컨트롤러 파일을 가져옴
import UserController from '../controllers/UserController.js';

const router = express.Router();

// 컨트롤러에서
const { handleRegister, handleLogin, getUserProfile } = UserController;

// '/api/users/register' (POST)
router.post('/register', handleRegister);

// '/api/users/login' (POST)
router.post('/login', handleLogin);

// '/api/users/profile' (GET)
router.get('/profile', getUserProfile);

export default router;