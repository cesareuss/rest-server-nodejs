//================================================
//              Configuracion Global
//================================================

process.env.PORT = process.env.PORT || 3000;

//================================================
//              Enviroment
//================================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//================================================
//              Connection BD mongo
//================================================

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/DBLocal';
} else {
    urlDB = 'mongodb+srv://admin:admin@dbcluster-6w8zr.mongodb.net/test?retryWrites=true';
}

process.env.URLDB = urlDB;