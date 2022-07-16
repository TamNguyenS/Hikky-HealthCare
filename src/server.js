import express from 'express';
import configViewEngine from './config/viewEngine.config';
import connectDB from './config/connectDB.config';
import initWebRoute from './router/web.router';
import initApiRoute from './router/api.router';
import 'dotenv/config'

const app = express();

const port = process.env.PORT || 8888;
console.log(process.env.PORT);
// config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);
initWebRoute(app);
initApiRoute(app);

connectDB();

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})