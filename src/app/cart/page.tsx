'use client'
import { CartState, EditProductInCart, RemoveProductToCart } from '@/redux/cartSlice'
import { Button } from 'antd'
import Image from 'next/image'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutModal from './components/CheckoutModal'

function Cart() {
    const[showCheckoutModal, setShowCheckoutModal] = useState(false)
    const { cartItems }: CartState = useSelector((state: any) => state.cart)
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const total = subtotal + 50
    const dispatch = useDispatch()
    return (
        <div className='mt-10'>
            <div className="grid grid-cols-3 text-gray-700 gap-10">
                <div className="col-span-2 flex flex-col gap-5">
                    <span className='text-2xl font-semibold'>My Cart</span>
                    <div className="grid grid-cols-7 gap-10">
                        <span className="col-span-4">Product</span>
                        <span className="col-span-1">Each</span>
                        <span className="col-span-1">Quantity</span>
                        <span className="col-span-1">Total</span>
                    </div>
                    <div className="col-span-7">
                        <hr />
                    </div>
                    {
                        cartItems.map((item) => (
                            <div className="grid grid-cols-7 items-center gap-10" key={item._id}>
                                <div className="col-span-4 flex gap-2 items-center">
                                    <Image src={item.images[0]} alt='' height={80} width={80} className='border p-2 border-gray-300 border-solid' />
                                    <div className="flex flex-col gap-2 ">
                                        <span className='text-sm'>{item.name}</span>
                                        <span className='text-sm underline text-red-700 cursor-pointer' onClick={() => dispatch(RemoveProductToCart(item))}>Remove</span>
                                    </div>
                                </div>
                                <span className='col-span-1'>${item.price}</span>
                                <div className="col-span-1 border border-solid p-2 border-gray-400 flex gap-2 justify-between">
                                    <i className='ri-subtract-line'
                                        onClick={() => {
                                            if (item.quantity !== 1) {
                                                dispatch(EditProductInCart({
                                                    ...item,
                                                    quantity: item.quantity - 1
                                                }))
                                            } else {
                                                dispatch(RemoveProductToCart(item))
                                            }
                                        }}></i>
                                    <span>{item.quantity}</span>
                                    <i className='ri-add-line' onClick={() => dispatch(EditProductInCart({
                                        ...item,
                                        quantity: item.quantity + 1
                                    }))}></i>
                                </div>
                                <span className='col-span-1'>${item.price * item.quantity}</span>
                            </div>
                        ))
                    }
                </div>
                <div className="col-span-1 border border-solid border-gray-400 p-5">
                    <h1 className='text-xl font-semibold'>Amount summary</h1>
                    <hr className='border border-gray-400 border-dashed' />
                    <div className="flex flex-col gap-2 mt-5">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping fee</span>
                            <span>$50</span>
                        </div>
                        <hr className='border border-gray-200 border-dashed' />
                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>${total}</span>
                        </div>
                        <Button type='primary' block className='mt-10' onClick={() => {
                            setShowCheckoutModal(true)

                        }}>Proceed to checkout</Button>
                    </div>
                </div>
            </div>
            {showCheckoutModal && <CheckoutModal setShowCheckoutModal={setShowCheckoutModal} showCheckoutModal={showCheckoutModal} total={total}/>}
        </div >
    )
}

export default Cart