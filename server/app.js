import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './src/routes/user.js';
import categoriesRouter from './src/routes/categories.js';
import pomodoroRouter from './src/routes/pomodoro.js';
import config from './src/helpers/config.js';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(cors(config.CORSCONFIG));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/categories', categoriesRouter);
app.use('/pomodoro', pomodoroRouter);

app.get('/', (req, res) => {
  res.send('home page')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});