import {z} from 'zod'
import { Status } from '@prisma/client';


export const ZodAspiranteObj = z.object({
    nombre      : z.string(),
    email       : z.string().email(),
    telefono    : z.string(),
    curp       : z.string(),
    username   : z.string(),
    carrera_deseada : z.string(),
    status    : z.enum([Status.ACEPTADO, Status.RECHAZADO])
})

export const ZodAspiranteIdObj = z.object({
    id         : z.number().positive().min(1),
    nombre      : z.string(),
    email       : z.string().email(),
    telefono    : z.string(),
    curp       : z.string(),
    username   : z.string(),
    carrera_deseada : z.string(),
    status    : z.enum([Status.ACEPTADO, Status.RECHAZADO])
})

export const ZodAspiranteIdObjUpdate = z.object({
    id: z.number().positive().min(1),
    status: z.enum([Status.ACEPTADO, Status.RECHAZADO])
})