import { Router } from 'express';
import type { Request, Response } from 'express';
import { prisma } from '../db'
import type { APIResponse } from '../lib/types';
import type { Periodos } from '@prisma/client';
import {ZodPeriodoObj, ZodPeriodoIdObj} from '@/validation/ZodPeriodo';
import { z, type ZodIssue } from 'zod';

export const router = Router();

router.get('/', async (_: Request, res: Response) => {
    let Periodos = await prisma.periodos.findMany();

    let responseOk: APIResponse<Periodos[]> = {
        status: 'success',
        data: Periodos
    }

    return res.status(200).json(responseOk);
})



router.post('/', async (req: Request, res: Response) => {
    try{
        const camposValidados = ZodPeriodoObj.parse(req.body)
        let periodos = await prisma.periodos.create({
            data: camposValidados
        });
        let responseOk: APIResponse<Periodos> = {
            status: 'success',
            data: periodos
        }
        return res.status(200).json(responseOk)
    } catch (error) {
        let responseError: APIResponse<Error> = {
            status: "error",
            error: "Error en el servidor"
        }
        if (error instanceof z.ZodError) {
            let responseErrorZod:APIResponse<ZodIssue[]> = {
                status: "error",
                error: "Datos invalidos",
                data: error.errors
            }
            return res.status(400).json(responseErrorZod)
        }
        return res.status(500).json(responseError)
    }
});


router.put('/', async (req: Request, res: Response) => {
    try{
        const camposValidados = ZodPeriodoIdObj.parse(req.body)
        let periodoBusqueda = await prisma.periodos.findFirst({
            where : {id: camposValidados.id},
        });

        if(!periodoBusqueda){
            let responseError: APIResponse<Error> = {
                status: "error",
                error: "Periodo no encontrado"
            }
            return res.status(404).json(responseError)
        }
        let periodo = await prisma.periodos.update({
           where : {id: camposValidados.id},
            data: camposValidados
        });
        let responseOk: APIResponse<Periodos> = {
            status: 'success',
            data: periodo
        }
        return res.status(200).json(responseOk)
    } catch (error) {
        let responseError: APIResponse<Error> = {
            status: "error",
            error: "Error en el servidor"
        }
        if (error instanceof z.ZodError) {
            let responseErrorZod:APIResponse<ZodIssue[]> = {
                status: "error",
                error: "Datos invalidos",
                data: error.errors
            }
            return res.status(400).json(responseErrorZod)
        }
        return res.status(500).json(responseError)
    }
});

