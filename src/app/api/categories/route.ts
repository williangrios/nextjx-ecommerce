import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/configs/dbConfig"
import categories from "@/models/categoryModel"
import { validateJWT } from "@/helpers/validateJWT"
connectDB()

export async function POST(request: NextRequest){
    try {
        // check if category already exists
        const userId = await validateJWT(request)
        const reqBody = await request.json()
        const categoryExists = await categories.findOne({
            name: reqBody.name
        })
        if (categoryExists){
            throw new Error ('Category already exists')
        }
        reqBody.createdBy = userId
        const category = new categories(reqBody)
        await category.save()
        return NextResponse.json({
            message: 'Category created successfully'
        })
        return
    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        }, {
            status: 500
        })
    }
}

export async function GET(request: NextRequest){
    try {
        await validateJWT(request)
        const categoryList = await categories.find().populate('createdBy', 'name').sort({createdAt: -1})
        return NextResponse.json({
            data: categoryList
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        }, {
            status: 500
        })        
    }
}