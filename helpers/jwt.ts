import jwt from 'jsonwebtoken';

const generateJWT = ( uid = '' ): Promise<string> => {
  return new Promise( (resolve, reject) => {
      const payload = {uid};
      jwt.sign(payload, process.env.SECRET_KEY || 'basic', {
          expiresIn: '4h'
      }, (err, token) => {
          if(err || !token) {
              console.log(err);
              reject('Error generating the JWT');
          } else {
              resolve(token);
          }
      });
  });
}

export default generateJWT;
