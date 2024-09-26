import {z} from 'zod'
import { StatusPeriodo } from '@prisma/client';

export const ZodPeriodoObj = z.object({
    nombre      : z.string(),
    descripcion : z.string(),
    status      : z.enum([StatusPeriodo.ABIERTA, StatusPeriodo.INACTIVO])
})




