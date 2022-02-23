import jwt from "jsonwebtoken"

export default function authenticateJWT(req, res, next) {
    const token = req.headers['token'];
    if (token == '') {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
        if (err) {
            return res.sendStatus(401);
        }
        next()
    })
}