import { Router } from "express";
import { PlatilloController } from "../controller/PlatilloController";
import { checkJwt } from "../middlewares/jwt";
import { checkRole } from "../middlewares/role";

const router = Router();

//Get all platillos.
router.get('/', [checkJwt], PlatilloController.getAll);

//Get one platillo
router.get('/:id', [checkJwt, checkRole(['admin'])],  PlatilloController.getById);

//Create a new platillo
router.post('/', [checkJwt, checkRole(['admin'])],  PlatilloController.newPlatillo);

//Edit platillo
router.patch('/:id', [checkJwt, checkRole(['admin'])],  PlatilloController.editPlatillo);

//Delete
router.delete('/:id', [checkJwt, checkRole(['admin'])],  PlatilloController.deletePlatillo);

export default router;