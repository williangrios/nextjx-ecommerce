
import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/configs/dbConfig"
import { validateJWT } from "@/helpers/validateJWT"
import Category from "@/models/categoryModel"
connectDB()

export async function PUT(request: NextRequest, {params}: {
    params: {
        categoryid: string
    }
}) {
    try {
        await validateJWT(request)
        const reqBody = await request.json()
        await Category.findByIdAndUpdate(params.categoryid, reqBody)
        return NextResponse.json({
            message: 'Category updated successfully'
        }, {
            status: 200
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        }, {
            status: 500,
        })
    }
}

export async function DELETE(request: NextRequest ,{params}: {params: {categoryid: string}}) {
    try {
        await validateJWT(request)
        await Category.findByIdAndDelete(params.categoryid)
        return NextResponse.json({
            message: 'Category deleted successfully'
        } ,{
            status: 200
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        }, {
            status: 500
        })
    }
}