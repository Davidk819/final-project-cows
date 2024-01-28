import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken =  (token: string) => {
    const secretKey = process.env.JWT_SECRET || "";
    const user = Jwt.verify(token,secretKey)
    console.log(token);
    
    return user
}