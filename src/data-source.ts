import 'reflect-metadata';
import {DataSource} from "typeorm";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host:'localhost',
    port:3306,
    username: "root",
    password: "12345678",
    database: "usermanager",
    synchronize: true,
    logging: false,
    entities: ["dist/src/model/*.js"],
})