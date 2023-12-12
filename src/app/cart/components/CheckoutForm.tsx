'use client'
import Loader from '@/components/Loader'
import { CartState, ClearCart } from '@/redux/cartSlice'
import { AddressElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Button, message } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function CheckoutForm({ total , setShowCheckoutModal}: { total: number, setShowCheckoutModal: any }) {
    const [loading, setLoading] = useState(false)
    const { cartItems }: CartState = useSelector((state: any) => state.cart)
    const stripe = useStripe()
    const elements = useElements()
    const router = useRouter()
    const dispatch = useDispatch()
    const handleSubmit = async (e: any) => {
        try {
            setLoading(true)
            e.preventDefault()
            if (!stripe || !elements) {
                throw new Error('Stripe hasnt loaded yet')
            }
            const result = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: 'http://localhost:3000/cart'
                },
                redirect: 'if_required'
            })
            if (result.error) {
                throw result.error
            }
            message.success('Payment successfull')
            const orderPayload = {
                items: cartItems,
                paymentStatus: 'paid',
                orderStatus: 'order placed',
                shippingAddress: result.paymentIntent.shipping,
                transactionId: result.paymentIntent.id,
                total
            }
            await axios.post('/api/orders/place_order', orderPayload)
            dispatch(ClearCart)
            message.success('Order placed')
            router.push('/profile')
        } catch (error: any) {
            message.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                {loading &&  <Loader />}
                <div className='h-[350px] overflow-y-scroll p-5'>
                    <PaymentElement />
                    <AddressElement
                        options={{
                            allowedCountries: ['US'],
                            mode: 'shipping'
                        }}
                    />
                </div>
                <div className="flex gap-5">
                    <Button type='primary' htmlType='submit' className='mt-5' block loading={loading}>Pay</Button>
                    <Button htmlType='button' className='mt-5' block onClick={() => setShowCheckoutModal(false)}>Cancel</Button>
                </div>
            </form>
        </div>
    )
}

export default CheckoutForm