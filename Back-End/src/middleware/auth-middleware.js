import { ResponseError } from "../error/response-error.js";
import { verifyAccessToken } from "../utils/jwt.js";

const authentication = (req, res, next) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) throw new ResponseError(401, "Unauthorized");

    const user = verifyAccessToken(token)
    if (!user) throw new ResponseError(401, "Unauthorized");

    req.user = user;
    next();

}

const admin = (req, res, next) => {
    if (!req.user.role === "Admin") {
        throw new ResponseError(403, false, "Forbidden.. Kamu bukan Admin", null);
    }
    next();
}

const superAdmin = (req, res, next) => {
    if (!req.user.role === "Super Admin") {
        throw new ResponseError(403, false, "Forbidden.. Kamu bukan Super Admin", null);
    }
    next();
}

export { authentication, admin, superAdmin }