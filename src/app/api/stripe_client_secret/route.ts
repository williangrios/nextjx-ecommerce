import {NextRequest, NextResponse} from 'next/server'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const paymentIntent = await stripe.paymentIntent.create({
            amount: reqBody.amount * 100,
            currency: 'usd',
            description: 'Ecommerce Next.js'
        })
        return NextResponse.json({
             clientSecret: paymentIntent.clientSecret
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        }, {
            status: 500
        })
    }
}
