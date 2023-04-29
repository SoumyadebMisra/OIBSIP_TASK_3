const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).json({error: "Not authenticated"})
    if(!authHeader.startsWith('Bearer')) return res.status(401).json({error: "Not authenticated"})
    const token = authHeader.slice(7);
    jwt.verify(token, process.env.SECRET,async function(err, decoded) {
        if(err) next(err)
        if(decoded) req.headers['User-Id'] = decoded.id
        next();
    });
}

module.exports = { authMiddleware } 