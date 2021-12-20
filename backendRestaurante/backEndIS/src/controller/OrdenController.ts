import {getRepository} from "typeorm";
import {Request, Response} from "express";
import { Orden } from "../entity/Orden";
import { validate } from 'class-validator'

export class UserController {

    static getAll = async (req: Request, res: Response) => {
        const ordenRepository = getRepository(Orden);
        let ordenes;

        try{
            ordenes = await ordenRepository.find();
        }catch(e){
            res.status(404).json({message: 'Algo ha ido mal'});
        }

        if( ordenes.length>0){
            res.send(ordenes);
        }else{
            res.status(404).json({message: 'No hay resultados'});
        }
    }

    static getById = async (req: Request, res: Response) => {
        const {id} = req.params;
        const ordenRepository = getRepository(Orden);
        try{
            const orden = await ordenRepository.findOneOrFail(id);
            res.send(orden);
        }catch(e){
            res.status(404).json({message: 'No hay resultados'});
        }
    }
    
    static newOrden= async (req: Request, res: Response) => {
        const {platillos} = req.body;
        const orden = new Orden();

        orden.platillos = platillos;
        // console.log("Orden", orden.platillos);
        if(orden.platillos.length === 0 || orden.platillos === null){
            return res.status(409).json({message: 'Algo ha salido mal'});
        }

        let total = 0;
        orden.platillos.forEach( (element: any) => {
            total+=element.precio*element.cantidad
        });
        console.log("Total:", total);
        orden.total = total;

        //Validate
        const validationOpts = { validationError: { target: false, value: false}};
        const errors = await validate(orden, validationOpts);
        if(errors.length>0){
            return res.status(400).json(errors);
        }

        const userRepository = getRepository(Orden);
        try{
            await userRepository.save(orden);
        }catch(e){
            return res.status(409).json({message: 'Algo ha salido mal'});
        }

        res.send('Orden agregada exitosamente');
    }

    static deleteOrden = async (req: Request, res: Response) => {
        const {id} = req.params;
        const ordenRepository = getRepository(Orden);
        let orden: Orden;

        try{
            orden = await ordenRepository.findOneOrFail(id);
        }catch(e){
            return res.status(404).json({message: 'Orden no encontrada'});
        }

        //Remove orden
        ordenRepository.delete(id);

        res.status(201).json({message: 'Orden eliminada correctamente'});
    }

    static totalDelDia = async (req: Request, res: Response) => {
        var start = new Date();
        start.setUTCHours(0,0,0,0);
        var end = new Date();
        end.setUTCHours(23,59,59,999);

        console.log( start.toUTCString() + ':' + end.toUTCString() );
        start.toISOString();
        end.toISOString();
        console.log("Start", start);
        console.log("End", end);
        const ordenRepository = getRepository(Orden);
        let totalDelDia;//.where("orden.CreatAt ")
        totalDelDia = await ordenRepository.createQueryBuilder("orden").where("orden.createat >= :start", { start }).where("orden.updateat <= :end", { end }).select("SUM(orden.total)", "sum").getRawOne();
        res.status(201).json({total: totalDelDia.sum});
    }

}

export default UserController;