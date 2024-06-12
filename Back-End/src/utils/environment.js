import dotenv from 'dotenv/config';

const port = process.env.PORT;

const JWTSecret = process.env.JWT_SECRET;
const JWTEpiresIn = process.env.JWT_EXPIRES_IN;

const mailService = process.env.MAIL_SERVICE;
const mailUser = process.env.MAIL_USER;
const mailPassword = process.env.MAIL_PASSWORD;
const mailFrom = process.env.MAIL_FROM;


const serverKeyMidtrans = process.env.SERVER_KEY_MIDTRANS;
const rajaOngkirKey = process.env.RAJA_ONGKIR_KEY;


export {
    port,
    JWTSecret,
    JWTEpiresIn,
    mailService,
    mailUser,
    mailPassword,
    mailFrom,
    serverKeyMidtrans,
    rajaOngkirKey
}