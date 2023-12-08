import { connectDB } from "@/configs/dbConfig"
import { NextResponse, NextRequest } from "next/server"
import User from "@/models/userModel"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

connectDB()
export async function POST(request: NextRequest) {
    
    // try {
    //     const reqBody = await request.json()
    //     // check if user exists in DB or not
    //     const user = await User.findOne({email: reqBody.email})
    //     if (!user) {
    //         throw new Error('User doesnot exists')
    //     }
    //     const passwordMatch = await bcrypt.compare(reqBody.password, user.password)
    //     if (!passwordMatch){
    //         throw new Error('Invalid credentials')
    //     }
    //     // create token
    //     // tres parametros que passamos no sign
    //     // 1-dados que eu quero encriptar
    //     // 2-secret key
    //     // 3-validations
    //     const token = jwt.sign({id: user._id}, process.env.JWT_SECRET!, {
    //         expiresIn: '7d',
    //     })

    //     const response = NextResponse.json({
    //         message: 'Login Successful',
    //     })
    //     // parametros
    //     // 1-key
    //     // 2-value
    //     // 3-options
    //     response.cookies.set('token', token, {
    //         httpOnly: true,
    //         path: '/'
    //     })
    //     return response
    // } catch (error: any) {
    //     return NextResponse.json({
    //         message: error.message
    //     }, {
    //         status: 400
    //     })
    // }
}