import express from 'express';
import initWebRoute from './router/web';
import configViewEngine from './config/viewEngine';
import 'dotenv/config'


const app = express();

const port = process.env.PORT || 8888;
console.log(process.env.PORT);
// config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);
initWebRoute(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

