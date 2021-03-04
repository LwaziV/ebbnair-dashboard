import jwt from 'jsonwebtoken'

const adminOnly = async (req, res, next) => {
  //@TODO comment this properly
  decodeJwt(req.headers['authorization']).then((decodedToken: any) => {
    if (decodedToken) {
      if (decodedToken.user.role === 'ADMIN') {
        next();
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(401);
    }
  });
};

const usersOnly = async (req, res, next) => {
  //
  decodeJwt(req.headers['authorization']).then((decodedToken: any) => {
    if (decodedToken) {
      if (
        decodedToken.user.role === 'TEACHER' ||
        decodedToken.user.role === 'ADMIN'
      ) {
        next();
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(401);
    }
  });
};

const decodeJwt = async (authHeader: any) => {
  return new Promise((resolve, reject) => {
    // Gather the jwt access token from the request header
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      console.log('no token supplied');
      resolve(null);
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err: any, decodedJwt: any) => {
      if (err) {
        console.log(err);
        resolve(null);
      }
      resolve(decodedJwt);
    });
  });
};

const generateAccessToken = (user: any) => {
  // expires after an hour (3600 seconds = 60 minutes)
  delete user.password;
  return jwt.sign(
    {
      user,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: '3600s',
    }
  );
};

module.exports = {
  adminOnly,
  usersOnly,
  decodeJwt,
  generateAccessToken,
};
