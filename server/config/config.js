//================================================
//              Configuracion Global
//================================================

process.env.PORT = process.env.PORT || 3000;

//================================================
//              Enviroment
//================================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//================================================
//              TOKEN
//================================================
// valides 60sed * 60 min * 24hrs * 30 dias

process.env.VALIDES_TOKEN = (60 * 60 * 24 * 30);

process.env.SEED_TOKEN = process.env.SEED_TOKEN || 'secret';

//================================================
//              Connection BD mongo
//================================================

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/DBLocal';
} else {
    urlDB = process.env.MONGO_URL;
}

//================================================
//              Google ClienId
//================================================

process.env.CLIENT_ID = process.env.CLIENT_ID || '254656896882-07s3gcfqraq0ad5d5389qcqu44q8bvmp.apps.googleusercontent.com';

process.env.URLDB = urlDB;