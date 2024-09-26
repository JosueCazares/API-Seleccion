import { Router } from 'express';
import type { Request, Response } from 'express';
import { prisma } from '../db'
import type { APIResponse } from '../lib/types';
import type { Aspirantes } from '@prisma/client';
import {ZodAspiranteObj, ZodAspiranteIdObj} from '@/validation/ZodAspirante'
import { z, type ZodIssue } from 'zod';

export const router = Router();

router.get('/', async (_: Request, res: Response) => {
    let examples = await prisma.aspirantes.findMany();

    let responseOk: APIResponse<Aspirantes[]> = {
        status: 'success',
        data: examples
    }

    return res.status(200).json(responseOk);
})


router.post('/', async (req: Request, res: Response) => {
    try{
        const camposValidados = ZodAspiranteObj.parse(req.body)
        let aspirante = await prisma.aspirantes.create({
            data: camposValidados
        });
        let responseOk: APIResponse<Aspirantes> = {
            status: 'success',
            data: aspirante
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
        const camposValidados = ZodAspiranteIdObj.parse(req.body)
        let aspiranteBusqueda = await prisma.aspirantes.findFirst({
            where : {id: camposValidados.id},
        });

        if(!aspiranteBusqueda){
            let responseError: APIResponse<Error> = {
                status: "error",
                error: "Aspirante no encontrado"
            }
            return res.status(404).json(responseError)
        }
        let aspirante = await prisma.aspirantes.update({
           where : {id: camposValidados.id},
            data: camposValidados
        });
        let responseOk: APIResponse<Aspirantes> = {
            status: 'success',
            data: aspirante
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



