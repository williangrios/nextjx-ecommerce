import axios from 'axios'
import { cookies } from 'next/headers'
import React from 'react'
import ProductImages from './components/ProductImages'
import ProductActionButtons from './components/ProductActionButtons'

async function getProduct(productId: string) {
    try {
        const cookiesStore = cookies()
        const token = cookiesStore.get('token')?.value
        const endpoint = `${process.env.DOMAIN}/api/products/${productId}`
        const response = await axios.get(endpoint, {
            headers: {
                Cookie: `token=${token}`,
            }
        })
        return response.data
    } catch (error) {
        return null
    }
}

async function ProductInfo({ params }: {
    params: {
        productid: string
    }
}) {
    const product = await getProduct(params.productid)
    return (
        <div className='mt-10 px-10'>
            {product &&
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <ProductImages product={product} />
                        <div className="flex flex-col">
                            <h1 className='text-2xl font-semibold'>{product.name}</h1>
                            <h1 className='text-4xl'>${product.price}</h1>
                            <ProductActionButtons />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProductInfo