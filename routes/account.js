import { Router } from 'express';
const router = Router();

import account from '../controllers/account/index.js';

// Logs a user in with a username and password
// router.get('/login/:', (req, res) => {
//     return account.login(req.params, res)
// });

// // Registers a user
// router.get('/register/:', (req, res) => {
//     return account.register(req.params, res)
// });

export default router;