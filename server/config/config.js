// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;


// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



// ============================
//  Vencimiento del token
// ============================
//60 segundos
//60 minutos
//24 horas
//30 dias 

process.env.CADUCIDAD_TOKEN = '48h';


// ============================
//  SEED de autenticacion 
// ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarollo';





// ============================
//  Base de datos 
// ============================


let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB='mongodb://localhost:27017/cafe';
}else {
    urlDB ='mongodb+srv://mariela21:N8yAuDjldBnhInZS@cluster0.y4cmm.mongodb.net/cafe';
          
}
process.env.URLDB = urlDB;



// ============================
//  Base de datos 
// ============================

process.env.CLIENT_ID = process.env.CLIENT_ID || '1096672272141-calpqho5gitu3v63ou6uf68kuk4fmljn.apps.googleusercontent.com';