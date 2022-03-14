const jwt = require('jsonwebtoken');

function getToken(user){
    const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        role: user.role
      }
    
      const token = jwt.sign(
        payload, 
        process.env.SECRET_KEY_JWT,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      return token; 
}

module.exports = getToken;
