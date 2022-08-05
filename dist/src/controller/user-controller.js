"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const user_1 = require("../model/user");
class UserController {
    constructor() {
        this.showListPUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let users = yield this.userRepository.find();
            res.render('list', {
                users: users
            });
        });
        this.showCreateForm = (req, res) => {
            res.render('create');
        };
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let files = req.files;
            if (files) {
                let user = req.body;
                if (files.image && user.name) {
                    let image = files.image;
                    image.mv('./public/storage/' + image.name);
                    user.avatar = 'storage/' + image.name;
                    yield this.userRepository.save(user);
                    res.redirect(301, '/list');
                }
                else {
                    res.render('error');
                }
            }
            else {
                res.render('error');
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let iddelete = req.params.id;
            yield this.userRepository.delete(iddelete);
            res.redirect(301, '/list');
        });
        this.showUpdateForm = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let idupdate = +req.params.id;
            let user = yield this.userRepository.findOneBy({ id: idupdate });
            if (user) {
                res.render('update', { user: user });
            }
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let idUpdate = +req.params.id;
            let user = yield this.userRepository.findOneBy({ id: idUpdate });
            if (user) {
                let newUser = req.body;
                let files = req.files;
                if (files) {
                    if (files.image) {
                        let image = files.image;
                        image.mv('./public/storage/' + image.name);
                        newUser.avatar = 'storage/' + image.name;
                    }
                }
                else {
                    newUser.avatar = user.avatar;
                }
                let neUser = this.userRepository.merge(user, newUser);
                yield this.userRepository.save(neUser);
                res.redirect(301, '/list');
            }
        });
        data_source_1.AppDataSource.initialize().then(connection => {
            this.userRepository = connection.getRepository(user_1.User);
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=user-controller.js.map