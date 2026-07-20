import { Pelicula } from "./pelicula.js";
import client from "../common/db.js";
import { ObjectId } from "mongodb";

const peliculaCollection = client.db('cine-db').collection('peliculas');

async function handleInsertPeliculaRequest(req, res) {
    let data = req.body;
    await peliculaCollection.insertOne(data)
        .then((result) => {
            if (result === null) { return res.status(400).json({ error: "No insertado" }); }
            return res.status(201).json(result);
        })
        .catch((e) => { return res.status(500).json({ error: e.message }); });
}

async function handleGetPeliculasRequest(req, res) {
    await peliculaCollection.find().toArray()
        .then((data) => { return res.status(200).json(data); })
        .catch((e) => { return res.status(500).json({ error: e.message }); });
}

async function handleGetPeliculaByIdRequest(req, res) {
    try {
        let oid = ObjectId.createFromHexString(req.params.id);
        await peliculaCollection.findOne({ _id: oid })
            .then((data) => {
                if (data === null) { return res.status(404).json({ error: "No encontrado" }); }
                return res.status(200).json(data);
            })
            .catch((e) => { return res.status(500).json({ error: e.message }); });
    } catch (e) {
        return res.status(400).json({ error: "Id mal formado" });
    }
}

async function handleUpdatePeliculaByIdRequest(req, res) {
    try {
        let oid = ObjectId.createFromHexString(req.params.id);
        let query = { $set: req.body };
        await peliculaCollection.updateOne({ _id: oid }, query)
            .then((data) => {
                if (data === null || data.modifiedCount === 0) { return res.status(404).json({ error: "No actualizado" }); }
                return res.status(200).json(data);
            })
            .catch((e) => { return res.status(500).json({ error: e.message }); });
    } catch (e) {
        return res.status(400).json({ error: "Id mal formado" });
    }
}

async function handleDeletePeliculaByIdRequest(req, res) {
    try {
        let oid = ObjectId.createFromHexString(req.params.id);
        await peliculaCollection.deleteOne({ _id: oid })
            .then((data) => {
                if (data === null || data.deletedCount === 0) { return res.status(404).json({ error: "No eliminado" }); }
                return res.status(200).json(data);
            })
            .catch((e) => { return res.status(500).json({ error: e.message }); });
    } catch (e) {
        return res.status(400).json({ error: "Id mal formado" });
    }
}

export default {
    handleInsertPeliculaRequest,
    handleGetPeliculasRequest,
    handleGetPeliculaByIdRequest,
    handleUpdatePeliculaByIdRequest,
    handleDeletePeliculaByIdRequest
};