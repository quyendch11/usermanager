import {Router} from "express";
import UserController from "../controller/user-controller";

export const userRoutes = Router();
userRoutes.get('/list', UserController.showListPUser);
userRoutes.get('/create', UserController.showCreateForm);
userRoutes.post('/create',UserController.createUser);
userRoutes.get('/delete/:id',UserController.deleteUser);
userRoutes.get('/update/:id',UserController.showUpdateForm);
userRoutes.post('/update/:id',UserController.updateUser);