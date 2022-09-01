import express from 'express';
import {PomComplete,GetHistoricPoms} from '../controllers/pomodoro.controller.js';
import {Auth} from '../controllers/auth.controller.js'
var router = express.Router();

router.post('/', Auth, PomComplete);
router.get('/', Auth, GetHistoricPoms);

export default router;