import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";
import { getRepository } from 'typeorm';
import config from "../config/config";

export const checkRole = (roles: Array<string>)  => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = <string>req.headers.auth;
        let jwtPayload;
        jwtPayload = <any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
        const { userId } = res.locals.jwtPayload;
        const userRepository = getRepository(User);
        let user: User;

        try{
            user = await userRepository.findOneOrFail(userId);
        }catch(e){
            return res.status(401).json({ message: 'No autorizado'});
        }

        //Check
        const { role } = user;  
        if( roles.includes(role) ){
            next();
        }else{
            return res.status(401).json({ message: 'No autorizado'});
        }
    };
};