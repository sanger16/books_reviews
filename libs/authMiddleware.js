const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    if (req.session.authorization) {
        const token = req.session.authorization['token'];
        /* VERIFICA JWT */
        if (token) {
            jwt.verify(token, 'asfdasjdnbkj#%&7hfas', (err, decodedToken) => {
                if (err) {
                    return res.status(403).json({message: "User not authenticated"});
                } else {
                    console.log(decodedToken);
                    next();
                }
            })
        }
    } else {
        //res.redirect('login');
        return res.status(403).json({message: "User not logged in"});
    }
}

module.exports = { requireAuth };