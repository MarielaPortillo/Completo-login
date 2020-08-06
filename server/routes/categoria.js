const express = require('express');

let {verificaToken, verificaAdmin_Role} = require('../middlewares/autenticacion');

let app = express();


let Categoria = require('../models/categoria');
const { json } = require('body-parser');
const categoria = require('../models/categoria');

//===============================
//Mostrar todas las categorias
//================================
app.get('/categoria', verificaToken, (req, res)=> {


    Categoria.find({})
             .populate('Usuario')
             .exec((err,categorias) =>{
                if(err){
                    return res.status(500).json({
                        ok:false,
                        err
                    });
                }
                res.json({
                    ok:true,
                    categorias
                })


             })



});


//===============================
//Mostrar todas las categorias
//================================

app.get('/categoria/:id', verificaToken,(req, res) =>{
    //Categoria.findById();
    let id = req.params.id;
    Categoria.findById(id, (err, categoriaDB) =>{

        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }
            if(!categoriaDB){
                return res.status(500).json({
                    ok:false,
                    err:{
                        message:'No encontro el Id'
                    }
                });
            }
            res.json({
                ok:true,
                categoriaDB
            })
    

    });
});



//===============================
//Crear nueva categorias
//================================

app.post('/categoria', verificaToken,(req,res)=>{

let body = req.body;

let categoria = new Categoria({

    descripcion:body.descripcion,
    usuario: req.usuario.id
});


categoria.save((err, categoriaDB)=>{

if(err){
    return res.status(500).json({
        ok:false,
        err
    });
}

if(!categoriaDB){
    return res.status(400).json({
        ok:false,
        err
    });
}

res.json({
    ok:true,
    categoria:categoriaDB
})



});




});

//===============================
//Editar Categorias
//================================
app.put('/categoria/:id',verificaToken, (req, res) =>{

    let id = req.params.id;
    let body = req.body;

    let desCategoria = {
        descripcion: body.descripcion
    };

    Categoria.findByIdAndUpdate(id, desCategoria, {new:true, runValidators:true}, (err, categoriaDB) => {

        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }
        
        if(!categoriaDB){
            return res.status(400).json({
                ok:false,
                err
            });
        }


        res.json({
            ok:true,
            categoria:categoriaDB
        });



    });





});

//===============================
//Eliminar Categorias
//================================
app.delete('/categoria/:id',[verificaToken,verificaAdmin_Role], (req,res)=>{

let id = req.params.id;

Categoria.findByIdAndRemove(id, (err, categoriaDB)=>{

    if(err){
        return res.status(500).json({
            ok:false,
            err
        });
    }
    
    if(!categoriaDB){
        return res.status(400).json({
            ok:false,
            err:{
                message: 'El id no existe'
            }
        });
    }

    res,json({
        ok:true,
        message:'Categoria Eliminada'
    })


});




});

module.exports =app;
