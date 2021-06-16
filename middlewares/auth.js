const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied');
    try {
        const verified = jwt.verify(token, "Abc");
        req.user = verified
        next();
    } catch (error) {
        req.status(400).send('Invalid Token')
    }
}