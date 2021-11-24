const express = require('express');
const router =  express.Router();

const pool = require('../database.js');

router.get('/', async (req, res)=>{
    let listCategoria = await pool.query('SELECT * FROM categoria');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listCategoria: listCategoria
    });
});

router.get('/:id', async (req, res) =>{
    const { id } = req.params;
    let categoria = await pool.query('SELECT * FROM categoria WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado la categoria",
        categoria: categoria
    });
});

router.post('/create', async (req, res)=> {
    const { nombre } = req.body;
    // var dateCreated = new Date().toISOString();
    //var dateCreated2 = new Date().toLocaleString();
    const categoria ={
        nombre
    };

    await pool.query('INSERT INTO categoria set ?', [categoria]);
    res.json({
        status: 200,
        message: "Se ha registrado exitosamente!",
        categoria: categoria
    });
});

router.post('/update/:id', async (req, res)=>{
    const { id } = req.params;
    const { nombre } = req.body;

    const categoria = { nombre };

     await pool.query('UPDATE categoria SET ? WHERE id = ?', [categoria, id]);
        res.json({
            status: 200,
            message: "Se ha actualizado correctamente",
            categoria: categoria
        });
});

router.post ('/delete/:id', async (req, res) =>{
    const { id } = req.params;

    await pool.query('DELETE FROM categoria WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha eliminado la categoría correctamente"
    });
});

module.exports = router;