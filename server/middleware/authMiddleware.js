const jwt = require('jsonwebtoken');
module.exports = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
  
    if (!token) {
      return res.sendStatus(401); // send Unauthorized if no token is provided
    }
  
    jwt.verify(token, 'secret', (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden, if token is wrong
      }
  
      req.user = user;
  
      next();
    });
}