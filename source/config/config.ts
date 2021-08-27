import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1400;
const SECRETORPRIVATEKEY = 'f4c3800kM4n46m3nt_pr1v4t3';
const SECRETORPUBLICTEKEY = 'f4c3800kM4n46m3nt_pu811c';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const USER = {
    name: 'han',
    pass: 'h4n5010'
};

const TOKEN = {
    secretOrPrivateKey: SECRETORPRIVATEKEY,
    secretOrPublicKey: SECRETORPUBLICTEKEY,
    options: { algorithm: 'HS256', keyid: '1', noTimestamp: false, expiresIn: '1min', notBefore: '2s' }
};

const config = {
    server: SERVER,
    token: TOKEN,
    user: USER
};

export default config;
