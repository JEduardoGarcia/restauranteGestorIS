import { getRepository } from "typeorm";
import { Request, Response } from 'express';
import {User} from '../entity/User'; 
import * as jwt from 'jsonwebtoken';
import config from "../config/config";
import { validate } from 'class-validator';

class AuthController{

    static login = async (req: Request, res: Response) =>{
        const {username, password} = req.body;

        if(!(username&&password)){
            return res.status(400).json({message: '¡Nombre de usuario y contraseña requeridos!'});
        }

        const userRepository = getRepository(User);
        let user: User;

        try{
            user = await userRepository.findOneOrFail({where:{username}});
        }catch (e){
            return res.status(400).json({message: '¡Nombre de usuario y contraseña incorrectos!'});
        }

        //Check password
        if(!user.checkPassword(password)){
            return res.status(400).json({message: '¡Nombre de usuario y contraseña incorrectos!'});
        }

        const token = jwt.sign({userId: user.id, username: user.username}, config.jwtSecret, {expiresIn: '1h'});
        res.json({message: 'OK', token});
    };

    static changePassword = async (req: Request, res: Response) => {
    
        const token = <string>req.headers.auth;
        let jwtPayload;
        jwtPayload = <any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
        const { userId } = res.locals.jwtPayload;
        const { oldPassword, newPassword } = req.body;

        if(!(oldPassword&&newPassword)){
            res.status(400).json({message: 'La contraseña antigua y la nueva son requeridas'});
        }

        const userRepository = getRepository(User);
        let user: User;

        try{
            user = await userRepository.findOneOrFail(userId);
        }catch(e){
            res.status(400).json({message: 'Algo ha salido mal'});
        }

        if(!user.checkPassword(oldPassword)){
            return res.status(401).json({message: 'Verifica tu vieja contraseña'});
        }

        user.password = newPassword;
        const validationOpts = { validationError: { target: false, value: false }};
        const errors = await validate(user, validationOpts);

        //Hash password
        user.hashPassworrd();
        userRepository.save(user);

        res.json({message: '¡La contraseña ha sido actualizada!'});
    }

};

export default AuthController;