import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Platillo } from "../entity/Platillo";
import { validate } from 'class-validator'

export class PlatilloController {

    static getAll = async (req: Request, res: Response) => {
        const platilloRepository = getRepository(Platillo);
        let platillos;

        try{
            platillos = await platilloRepository.find();
        }catch(e){
            res.status(404).json({message: 'Algo ha ido mal'});
        }

        if( platillos.length>0){
            res.send(platillos);
        }else{
            res.status(404).json({message: 'No hay resultados'});
        }
    }

    static getById = async (req: Request, res: Response) => {
        const {id} = req.params;
        const platillosRepository = getRepository(Platillo);
        try{
            const platillo = await platillosRepository.findOneOrFail(id);
            res.send(platillo);
        }catch(e){
            res.status(404).json({message: 'No hay resultados'});
        }
    }
    
    static newPlatillo = async (req: Request, res: Response) => {
        const {nombre, precio} = req.body;
        const platillo = new Platillo();

        platillo.nombre = nombre;
        platillo.precio = precio;

        //Validate
        const validationOpts = { validationError: { target: false, value: false}};
        const errors = await validate(platillo, validationOpts);
        if(errors.length>0){
            return res.status(400).json(errors);
        }

        const platillosRepository = getRepository(Platillo);
        try{
            await platillosRepository.save(platillo);
        }catch(e){
            return res.status(409).json({message: 'El nombre de usuario ya existe'});
        }

        res.send('El platillo ha sido creado');
    }
    
    static editPlatillo = async (req: Request, res: Response) => {
        let platillo;
        const {id} = req.params;
        const {nombre, precio} = req.body;

        const platillosRepository = getRepository(Platillo);

        try{
            platillo = await platillosRepository.findOneOrFail(id);
            platillo.nombre = nombre;
        }catch(e){
            return res.status(404).json({message: 'Platillo no encontrado'});
        }

        platillo.nombre = nombre;
        if( precio != undefined){
            platillo.precio = precio;
        }

        const validationOpts = { validationError: { target: false, value: false}};
        const errors = await validate(platillo, validationOpts);

        if(errors.length>0){
            return res.status(400).json(errors);
        }

        //Try to save platillo
        try{
            await platillosRepository.save(platillo);
        }catch(e){
            return res.status(409).json({message: 'Nombre de platillo en uso'});
        }
        res.status(201).json({message: 'Platillo actualizado'});
    }

    static deletePlatillo = async (req: Request, res: Response) => {
        const {id} = req.params;
        const userRepository = getRepository(Platillo);
        let platillo: Platillo;

        try{
            platillo = await userRepository.findOneOrFail(id);
        }catch(e){
            return res.status(404).json({message: 'Platillo no encontrado'});
        }

        //Remove platillo
        userRepository.delete(id);
        res.status(201).json({message: 'Platillo eliminado correctamente'});
    }

}

export default PlatilloController;