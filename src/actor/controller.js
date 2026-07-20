import { Actor } from "./actor.js";
import client from "../common/db.js";
import { ObjectId } from "mongodb";

const actorCollection = client.db('cine-db').collection('actores');
const peliculaCollection = client.db('cine-db').collection('peliculas');

async function handleInsertActorRequest(req, res) {
    let data = req.body;
    try {
        let pelicula = await peliculaCollection.findOne({ nombre: data.nombrePeliculaValidar });
        
        if (!pelicula) {
             return res.status(400).json({ error: "La película a asignar no existe" });
        }

        await actorCollection.insertOne(data)
            .then((result) => { return res.status(201).json(result); })
            .catch((e) => { return res.status(500).json({ error: e.message }); });
    } catch (e) {
        return res.status(400).json({ error: "Error en la validación" });
    }
}

async function handleGetActoresRequest(req, res) {
    await actorCollection.find().toArray()
        .then((data) => { return res.status(200).json(data); })
        .catch((e) => { return res.status(500).json({ error: e.message }); });
}

async function handleGetActorByIdRequest(req, res) {
    try {
        let oid = ObjectId.createFromHexString(req.params.id);
        await actorCollection.findOne({ _id: oid })
            .then((data) => {
                if (data === null) { return res.status(404).json({ error: "No encontrado" }); }
                return res.status(200).json(data);
            })
            .catch((e) => { return res.status(500).json({ error: e.message }); });
    } catch (e) {
        return res.status(400).json({ error: "Id mal formado" });
    }
}

async function handleGetActoresByPeliculaRequest(req, res) {
    await actorCollection.find({ idPelicula: req.params.pelicula }).toArray()
        .then((data) => { return res.status(200).json(data); })
        .catch((e) => { return res.status(500).json({ error: e.message }); });
}

export default {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaRequest
};