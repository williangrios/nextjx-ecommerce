

import {NextRequest, NextResponse} from 'next/server'
import Order from '@/models/orderModel'
import { connectDB } from '@/configs/dbConfig'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY!)
connectDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const transactionId = reqBody.transactionId
        const refund = await stripe.refunds.create({
            payment_intent: transactionId
        })
        await Order.findOneAndUpdate({
            _id: reqBody.orderId
        }, {
            paymentStatus: 'refunded'
        })
        return NextResponse.json({
             refund
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        }, {
            status: 500
        })
    }
}
