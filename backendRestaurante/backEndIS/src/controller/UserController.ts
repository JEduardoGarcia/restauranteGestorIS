import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import { validate } from 'class-validator'

export class UserController {

    static getAll = async (req: Request, res: Response) => {
        const userRepository = getRepository(User);
        let users;

        try{
            users = await userRepository.find();
        }catch(e){
            res.status(404).json({message: 'Algo ha ido mal'});
        }

        if( users.length>0){
            res.send(users);
        }else{
            res.status(404).json({message: 'No hay resultados'});
        }
    }

    static getById = async (req: Request, res: Response) => {
        const {id} = req.params;
        const userRepository = getRepository(User);
        try{
            const user = await userRepository.findOneOrFail(id);
            res.send(user);
        }catch(e){
            res.status(404).json({message: 'No hay resultados'});
        }
    }
    
    static newUser = async (req: Request, res: Response) => {
        const {username, password, role} = req.body;
        const user = new User();

        user.username= username;
        user.password = password;
        user.role = role;

        //Validate
        const validationOpts = { validationError: { target: false, value: false}};
        const errors = await validate(user, validationOpts);
        if(errors.length>0){
            return res.status(400).json(errors);
        }

        //TODO: HASH Password
        const userRepository = getRepository(User);
        try{
            user.hashPassworrd();
            await userRepository.save(user);
        }catch(e){
            return res.status(409).json({message: 'El nombre de usuario ya existe'});
        }

        res.send('El usuario ha sido creado');
    }
    
    static editUser = async (req: Request, res: Response) => {
        let user;
        const {id} = req.params;
        const {username, role} = req.body;

        const userRepository = getRepository(User);

        try{
            user = await userRepository.findOneOrFail(id);
            user.username  =username;
            user.role = role;
        }catch(e){
            return res.status(404).json({message: 'Usuario no encontrado'});
        }

        user.username = username;
        user.role = role;

        const validationOpts = { validationError: { target: false, value: false}};
        const errors = await validate(user, validationOpts);

        if(errors.length>0){
            return res.status(400).json(errors);
        }

        //Try to save user
        try{
            await userRepository.save(user);
        }catch(e){
            return res.status(409).json({message: 'Nombre de usuario en uso'});
        }
        res.status(201).json({message: 'Usuario actualizado'});
    }

    static deleteUser = async (req: Request, res: Response) => {
        const {id} = req.params;
        const userRepository = getRepository(User);
        let user: User;

        try{
            user = await userRepository.findOneOrFail(id);
        }catch(e){
            return res.status(404).json({message: 'Usuario no encontrado'});
        }

        //Remove user
        userRepository.delete(id);
        res.status(201).json({message: 'Usuario eliminado correctamente'});
    }

}

export default UserController;