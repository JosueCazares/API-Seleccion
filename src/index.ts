import { app } from './serve';
import {env} from './env'
//routes register

 import { router as aspirante } from './routes/aspirantes';
 import { router as periodo } from './routes/periodos';



app.use('/api/aspirante',aspirante);
app.use('/api/periodo',periodo);


app.listen(env.PORT, () => {
    console.log(`API-SELECCION  started on port ${env.PORT}`);
})