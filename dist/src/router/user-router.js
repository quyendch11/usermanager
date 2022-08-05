"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user-controller"));
exports.userRoutes = (0, express_1.Router)();
exports.userRoutes.get('/list', user_controller_1.default.showListPUser);
exports.userRoutes.get('/create', user_controller_1.default.showCreateForm);
exports.userRoutes.post('/create', user_controller_1.default.createUser);
exports.userRoutes.get('/delete/:id', user_controller_1.default.deleteUser);
exports.userRoutes.get('/update/:id', user_controller_1.default.showUpdateForm);
exports.userRoutes.post('/update/:id', user_controller_1.default.updateUser);
//# sourceMappingURL=user-router.js.map