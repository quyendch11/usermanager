import express, {NextFunction, Request, Response, Router} from 'express';
import {userRoutes} from "./src/router/user-router";
import fileUpload from 'express-fileupload';
import bodyParser from "body-parser";


const PORT = 3000;

const app = express();
app.set('views', './src/views/');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.json());
app.use(fileUpload({
    createParentPath: true
}));
app.use('',userRoutes)
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});