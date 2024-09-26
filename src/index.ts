import { app } from './serve';
import {env} from './env'
//routes register

 import { router as aspirante } from './routes/aspirantes';



app.use('/api/aspirante',aspirante);


app.listen(env.PORT, () => {
    console.log(`API-USER  started on port ${env.PORT}`);
})