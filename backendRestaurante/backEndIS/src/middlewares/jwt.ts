import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers['auth'];
    let jwtPayload;

    try{
        jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    }catch(e){
        return res.status(401).json({message: 'No autorizado'});
    }

    const { userId, username } = jwtPayload;
    
    const newToken = jwt.sign({userId, username}, config.jwtSecret, {expiresIn: '1h'});
    res.setHeader('token', newToken);

    //Call next
    next();
};