'use client'
import React, { useEffect, useState } from 'react'
import ProductForm from '../../components/ProductForm'
import axios from 'axios'
import { message } from 'antd'
import Loader from '@/components/Loader'
import { uploadImagesAndReturnUrls } from '@/helpers/imageHandling'
import { useRouter } from 'next/navigation'

function EditProduct({
    params
}: { params: any }) {
    const [selectedFiles = [], setSelectedFiles] = useState([])
    const [loadingProduct, setLoadingProduct] = useState(false)
    const [loading, setLoading] = useState(false)
    const [existingImages = [], setExistingImages] = useState([])
    const [product = {}, setProduct] = useState<any>(null)
    const router = useRouter()
    const onSave = async (values: any) => {
        try {
            setLoading(true)
            const newImages = await uploadImagesAndReturnUrls(selectedFiles)
            const newAndExistingImages =[...existingImages, ...newImages]
            values.images = newAndExistingImages
            await axios.put(`/api/products/${params.productid}`, values)
            message.success('Product updated successfully')
            router.refresh()
            router.back()
        } catch (error: any) {
            message.error(error.message || error.response.data.message)
        }finally{
            setLoading(false)
        }
    }

    const getProduct = async () => {
        try {
            setLoadingProduct(true)
            const response = await axios.get(`/api/products/${params.productid}`)
            setExistingImages(response.data.image || [])
            setProduct(response.data)
        } catch (error: any) {
            message.error(error.message || error.response.data.message)
        } finally {
            setLoadingProduct(false)
        }
    }

    useEffect(() => {
        getProduct()
    }, [])


    return (
        <div>
            {loadingProduct && <Loader />}
            <h1 className='text-2xl font-bold text-gray-800'>Edit Product</h1>
            <hr />
            {product &&
                <ProductForm setSelectedFiles={setSelectedFiles} onSave={onSave} loading={loadingProduct} initialValues={product} existingImages={existingImages} setExistingImages={setExistingImages}/>
            }
        </div>
    )
}

export default EditProduct