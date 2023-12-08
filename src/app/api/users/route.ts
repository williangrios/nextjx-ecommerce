import { connectDB } from "@/configs/dbConfig"
import { NextResponse } from "next/server"

export async function GET() {
    connectDB()
    return NextResponse.json ({
        success: true,
        
    })
}