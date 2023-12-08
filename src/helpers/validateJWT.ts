import { NextRequest } from "next/server"
import jwt from 'jsonwebtoken'

export const validateJWT = async (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || ''
        if (!token){
            throw new Error('No token provided')
        }
        const decryptedToken: any = jwt.verify(token, process.env.JWT_SECRET!)
        return decryptedToken.id
    } catch (error: any) {
        throw new Error(error.message)
    }
}