const jwt = require('jsonwebtoken');

// jwt token generation using user id and secretkey
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'10d'});
}

module.exports= generateToken;