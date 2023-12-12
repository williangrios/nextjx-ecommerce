'use client'
import { Button } from 'antd'
import React from 'react'

function ProductActionButtons() {
  return (
    <div className='flex gap-5'>
        <Button type='dashed'>Add to cart</Button>
        <Button type='primary'>Buy Now</Button>
    </div>
  )
}

export default ProductActionButtons