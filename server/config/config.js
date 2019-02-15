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
    urlDB = MONGO_URL;
}

process.env.URLDB = urlDB;