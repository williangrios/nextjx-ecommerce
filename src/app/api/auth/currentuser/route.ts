import { connectDB } from "@/configs/dbConfig";
import { validateJWT } from "@/helpers/validateJWT";
import { NextResponse, NextRequest } from "next/server";
import User from '@/models/userModel'
connectDB()

export async function GET(request: NextRequest){
    try {
        const userId = await validateJWT(request)
        // don't get password
        const user = await User.findById(userId).select('-password')
        return NextResponse.json({
            data: user
        }, {
            status: 200
        })
    } catch (error: any) {
        return NextResponse.json({
            message : error.message
        }, {
            status: 400
        })
    }
}