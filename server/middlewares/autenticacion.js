const jwt = require('jsonwebtoken');


// ============================
//  Verificacion Token
// ============================

let verificaToken = (req, res, next) =>{

    let Token = req.get('token');

    
    jwt.verify(Token, process.env.SEED, (err, decoded) =>{

        if (err){
        return res.status(401).json({
            ok: false,
            err:{
                message:'Token no valido'
            }
        });

     }



     req.usuario = decoded.usuario;
     next();

    });
    

};



// ============================
//  Verificacion AdminRole
// ============================


let verificaAdmin_Role = (req, res, next) =>{

let usuario = req.usuario;

if (usuario.role === 'ADMIN_ROLE'){
    next();
    return;
}else{
    return res.json({
        ok:false,
        err:{
            message:'El usuario no es administrador'
        }
    });
 }


};

// =====================
// Verifica token para imagen
// =====================
let verificaTokenImg = (req, res, next) => {

    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();

    });


}



module.exports = {
    verificaToken,
    verificaAdmin_Role,
    verificaTokenImg
}