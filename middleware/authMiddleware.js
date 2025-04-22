import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id; // attaches userId to req.body
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: "Unauthorized access" });
    }
};

export default authMiddleware;

