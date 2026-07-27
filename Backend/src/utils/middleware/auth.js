import { verifyToken } from "../auth.js";

const authenticate = (req, res, next) => {
    console.log("Authorization Header:", req.headers.authorization);

    const token =
        req.headers.authorization?.split(" ")[1] ||
        req.cookies?.jwtToken;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const isValid = verifyToken(token);
    console.log("Decoded Token:", isValid);

    if (!isValid) {
        return res.status(401).json({ error: "Invalid Token" });
    }

    req.user = isValid;
    next();
};

export default authenticate;