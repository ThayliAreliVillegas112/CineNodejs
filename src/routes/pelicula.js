const express = require('express');
const router =  express.Router();

const pool = require('../database.js');

router.get('/', async (req, res)=>{
    let listPelicula = await pool.query('SELECT * FROM pelicula');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listPelicula: listPelicula
    });
});

router.get('/:id', async (req, res) =>{
    const { id } = req.params;
    let pelicula = await pool.query('SELECT * FROM pelicula WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado el pelicula",
        pelicula: pelicula
    });
});

router.post('/create', async (req, res)=> {
    const { titulo, descripcion, sinopsis, rating, fechaRegistro, categoria } = req.body;
    var dateCreated = new Date().toISOString();
    //var dateCreated2 = new Date().toLocaleString();
    const pelicula ={
        titulo, descripcion, sinopsis, rating, fechaRegistro: dateCreated , estado:1, categoria
    };

    await pool.query('INSERT INTO pelicula set ?', [pelicula]);
    res.json({
        status: 200,
        message: "Se ha registrado exitosamente!",
        pelicula: pelicula
    });
});
router.post('/update/:id', async (req, res)=>{
    const { id } = req.params;
    var dateUpdate = new Date().toISOString();
    const { titulo, descripcion, sinopsis, rating, fechaActualizacion , categoria } = req.body;

    const pelicula = {titulo, descripcion, sinopsis, rating, fechaActualizacion: dateUpdate,  categoria };

     await pool.query('UPDATE pelicula SET ? WHERE id = ?', [pelicula, id]);
        res.json({
            status: 200,
            message: "Se ha actualizado correctamente",
            pelicula: pelicula
        });
});

router.post ('/delete/:id', async (req, res) =>{
    const { id } = req.params;

    await pool.query('UPDATE pelicula SET estado = 0 WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha eliminado correctamente"
    });
});

module.exports = router;