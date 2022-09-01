import express from 'express';
import {Create, Get} from '../controllers/categories.controller.js';
import {Auth} from '../controllers/auth.controller.js'
var router = express.Router();

router.post('/create', Auth, Create);
router.get('/', Auth, Get);

export default router;