// need more features redis 
import express from 'express';
import configViewEngine from './config/viewEngine.config';
import connectDB from './config/connectDB.config';
import initWebRoute from './router/web.router';
import initApiRoute from './router/api.router';
import cookieParser from "cookie-parser";
import cors from 'cors';
import 'dotenv/config'

const app = express();

// config
const port = process.env.PORT || 8888;
console.log(process.env.PORT);
// Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.header('Access-control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
// middlewares
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

configViewEngine(app);
initWebRoute(app);
initApiRoute(app);

connectDB();

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})

// Error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500

    // response to client
    return res.status(status).json({
        error: {
            message: error.message
        }
    })
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})