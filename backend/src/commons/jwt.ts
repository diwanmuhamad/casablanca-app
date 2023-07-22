import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
dotenv.config();

const jwtSecret: string = String(process.env.JWT_SECRET)
const expireToken: number = Number(process.env.EXPIRE_TOKEN) ?? 0 

const tokenSigning = (user: any) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { userId: user?.id, email: user?.email, sid: user?.encSid },
      jwtSecret,
      { expiresIn: `${expireToken * 1000}` ?? `${3600 * 1000}` }, // as milliseconds
      (err, token) => {
        if (err) {
          return reject(err)
        }

        return resolve(token)
      }
    );
  });
};

const verifyToken = (token: any) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token,
      jwtSecret, {complete: true},
      (err, authData) => {
        if (err) {
          return reject(err)
        }

        return resolve(authData)
      }
    );
  });
};

const decodeToken = (token: any) => {
  return new Promise((resolve, reject) => {
    const result = jwt.decode(token, { complete: true });
    return resolve(result)
  });
};

export {
  tokenSigning,
  verifyToken,
  decodeToken
};
