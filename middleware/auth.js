const jwt = require('jsonwebtoken');
const config = require('config');
module.exports =function(req, res, next){
  const token = req.header('x-auth-token');
  if(!token) res.status(401).send('Acess denied no token provided');
	
	try{
		const decode =jwt.verify(token,config.get('jwtPrivateKey'));// if its valid it returns payloadss
         req.user=decode; // yopu will get the payload that you added in user.js then you can copare the payload in routes
	     next();
	}catch(ex){
		res.status(400).send('invalid token');
	}
	 
}

