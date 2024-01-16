import jwt, { JwtPayload } from "jsonwebtoken";

export const checkToken = (token: string) => {
    try {
        if (process.env.JWT_SECRET) {
            const verify = jwt.verify(token, process.env.JWT_SECRET);
            const userName: string = (verify as JwtPayload).username 
            return userName
        }
    } catch (error) {
        console.error(error);
        // return {errorMessage: "invalid token", status: 400}
        throw error
        
    }
}