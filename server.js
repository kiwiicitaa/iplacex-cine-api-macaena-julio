import express from 'express';
import cors from 'cors';
import client from './src/common/db.js';
import peliculaRoutes from './src/pelicula/routes.js';
import actorRoutes from './src/actor/routes.js';

const app = express();
const PORT = 3000 || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.status(200).send("Bienvenido al cine Iplacex");
});

app.use('/api', peliculaRoutes);
app.use('/api', actorRoutes);

await client.connect()
    .then(() => {
        console.log('DB Connected - Conexión exitosa a Atlas');
        app.listen(PORT, () => {
            console.log('Server running at: http://localhost:' + PORT);
        });
    })
    .catch((e) => { 
        console.log('Error de conexión a Atlas:', e); 
    });