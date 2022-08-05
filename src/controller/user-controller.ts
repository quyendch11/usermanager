import {AppDataSource} from "../data-source";
import {User} from "../model/user";
import {Request, Response} from "express";
import {UploadedFile} from "express-fileupload";
import {Repository} from "typeorm";

class UserController {
    private userRepository!: Repository<User>;

    constructor() {
        AppDataSource.initialize().then(connection => {
            this.userRepository = connection.getRepository(User);
        })
    }

    showListPUser = async (req: Request, res: Response) => {
        let users = await this.userRepository.find();
        res.render('list', {
            users: users
        });
    }

    showCreateForm = (req: Request, res: Response) => {
        res.render('create');
    }

    createUser = async (req: Request, res: Response) => {
        let files = req.files;
        if (files) {
            let user = req.body;
            if (files.image && user.name) {
                let image = files.image as UploadedFile;
                image.mv('./public/storage/' + image.name);
                user.avatar = 'storage/' + image.name;
                await this.userRepository.save(user);
                res.redirect(301, '/list');
            } else {
                res.render('error');
            }
        } else {
            res.render('error');
        }
    };

    deleteUser = async (req:Request,res:Response)=>{
        let iddelete = req.params.id;
        await this.userRepository.delete(iddelete);
        res.redirect(301, '/list');
    };

    showUpdateForm = async (req: Request, res: Response) => {
        let idupdate = +req.params.id;
        let user = await this.userRepository.findOneBy({id: idupdate});
        if(user){
            res.render('update',{user:user})
        }
    };

    updateUser = async (req:Request,res:Response)=>{
        let idUpdate = +req.params.id;
        let user = await this.userRepository.findOneBy({id: idUpdate});
        if(user){
            let newUser:User = req.body;
            let files = req.files;
            if (files) {
                if (files.image) {
                    let image = files.image as UploadedFile;
                    image.mv('./public/storage/' + image.name);
                    newUser.avatar = 'storage/' + image.name;
                }
            }else {
                newUser.avatar = user.avatar
            }
            let neUser = this.userRepository.merge(user,newUser);
            await this.userRepository.save( neUser);
            res.redirect(301, '/list');
        }
    };
}

export default new UserController()