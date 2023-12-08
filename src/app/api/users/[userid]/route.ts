import { NextResponse, NextRequest } from "next/server"

interface Params {
    userid: string
}

export async function GET(request: NextRequest, {params} : {params: Params}) {
    const userId = params.userid
    
    return NextResponse.json ({
        success: true,
        data: {
            id: userId,
            name: 'nomefff'
        }
        
    })
}