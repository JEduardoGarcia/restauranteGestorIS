import { Router } from "express";
import { checkJwt } from "../middlewares/jwt";
import OrdenController from '../controller/OrdenController';

const router = Router();

//Get all ordenes
router.get('/', [checkJwt], OrdenController.getAll);

//Get one orden
router.get('/:id', [checkJwt],  OrdenController.getById);

//Create a new orden
router.post('/', [checkJwt],  OrdenController.newOrden);

//Delete
router.delete('/:id', [checkJwt],  OrdenController.deleteOrden);

//Total del día
router.put('/', [checkJwt], OrdenController.totalDelDia);

export default router;