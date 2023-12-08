import { connectDB } from "@/configs/dbConfig"
import { NextResponse, NextRequest } from "next/server"
import User from "@/models/userModel"
import bcrypt from "bcryptjs"

connectDB()
export async function POST(request: NextRequest) {
    
    try {
        const reqBody = await request.json()
        const userExists = await User.findOne({ email: reqBody.email })
        if (userExists) {
            throw new Error ("User already exists")
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(reqBody.password, salt)
        reqBody.password = hashedPassword
        const newUser = new User(reqBody)
        await newUser.save()
        return NextResponse.json({
            message: "User created"
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        }, {
            status: 400
        })
    }
}