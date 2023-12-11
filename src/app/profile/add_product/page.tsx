'use client'
import React, { useEffect, useState } from 'react'
import ProductForm from '../components/ProductForm'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { message } from 'antd'
import { uploadImagesAndReturnUrls } from '@/helpers/imageHandling'

function AddProduct() {
    const [selectedFiles, setSelectedFiles] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    useEffect(() => {

    }, [selectedFiles])

    const onSave = async (values: any) => {
        try {
            setLoading(true)
            const imagesUrls = await uploadImagesAndReturnUrls(selectedFiles)
            values.images = imagesUrls
            await axios.post('/api/products', values)
            message.success('Product created successfully')
            router.push('/profile?id=1')
        } catch (error: any) {
            message.error(error.message || error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h1 className='text-2xl font-bold text-gray-800'>Add Product</h1>
            <hr />
            <ProductForm setSelectedFiles={setSelectedFiles} onSave={onSave} loading={loading} />
        </div>
    )
}

export default AddProduct