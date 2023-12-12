'use client'
import Loader from '@/components/Loader'
import { Order } from '@stripe/stripe-js'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

function OrderInfo({ params }: { params: any }) {
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(false)

    const getOrder = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`/api/orders/${params.orderid}`)
            setOrder(response.data)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getOrder()
    }, [])

    const getProperty = (key: string, value: any) => {
        return <div className='flex flex-col'>
            <span className='text-gray-700'>{key}</span>
            <span className='text-gray-600'><b>{value}</b></span>
        </div>
    }

    return (
        <div>
            {loading && <Loader />}
            {order && 
                <div>
                    <h1 className='font-bold text-2xl text-gray-700'>Order id: {order._id}</h1>
                    <hr />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
                        <h1 className="text-xl col-span-3">Basic information</h1>
                        {getProperty('Order ID', order._id)}
                        {getProperty('Placed On', moment( order.createdAt).format('DD MMM YYYY hh:mm a'))}
                        {getProperty('Total amount', order.total)}
                        {getProperty('Order status', order.orderStatus)}
                        {getProperty('Payment status', order.paymentStatus)}
                        {getProperty('Transaction id', order.transactionId)}
                    </div>
                    <h1 className='font-bold text-2xl text-gray-700'>Shipping information</h1>
                    {Object.keys(order.shippingAddress.address).map((key) => {
                        return getProperty(
                            key,
                            order.shippingAddress.address[key]
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default OrderInfo