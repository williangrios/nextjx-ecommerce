import { getAntdFieldRequiredRule } from '@/helpers/validations'
import { Button, Form, message, Upload } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface ProductFormProps {
    setSelectedFiles: any
    loading: boolean
    onSave: any
    initialValues ?: any
    existingImages? : any
    setExistingImages? : any
}

function ProductForm({ setSelectedFiles, loading, onSave, initialValues, existingImages, setExistingImages }: ProductFormProps) {
    const [categories, setCategories] = useState([])
    const router = useRouter()

    const getCategories = async () => {
        try {
            const response = await axios.get('/api/categories')
            setCategories(response.data.data)
        } catch (error: any) {
            message.error(error.message)
        } finally {
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div>
            <Form layout='vertical' className='mt-10 grid grid-cols-1 md:grid-cols-3' onFinish={onSave} initialValues={initialValues}>
                <div className="col-span-3">
                    <Form.Item label='Name' name='name' rules={getAntdFieldRequiredRule('Name is required')}><input /></Form.Item>
                </div>
                <div className="col-span-3">
                    <Form.Item label='Description' name='description' rules={getAntdFieldRequiredRule('Description is required')}><textarea /></Form.Item>
                </div>
                <Form.Item label='Price' name='price' rules={getAntdFieldRequiredRule('Price is required')}><input type='number' /></Form.Item>
                <Form.Item label='Category' name='category' rules={getAntdFieldRequiredRule('Caategory is required')}>
                    <select>
                        <option value=''>Select category</option>
                        {categories.map((category: any) => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </Form.Item>
                <Form.Item label='Count in stock' name='countInStock' rules={getAntdFieldRequiredRule('Stock is required')}><input type='number' /></Form.Item>

                <div className="col-span-3 flex gap-4">
                    {existingImages.map((image: any) => (
                        <div key={image} className='border p-3 border-solid border-gray-300'>
                            <img src={image} alt='product' className='w-20 h-20' />
                            <h1 className='cursor-pointer underline text-sm' onClick={() => {
                                setExistingImages((prev: any) => prev.filter((i: any) => i !== image))
                            }}>Remove</h1>
                        </div>

                    ))}
                </div>

                <div className="col-span-3">
                    <Upload listType='picture-card' multiple
                    beforeUpload={(file) => {
                        setSelectedFiles((prev: any) => [...prev, file])
                        return false
                    }}>Upload</Upload>
                </div>
                <div className="col-span-3 justify-end flex gap-5">
                    <Button loading={loading} onClick={() => router.back()}>Back</Button>
                    <Button type='primary' htmlType='submit' loading={loading}>Save</Button>
                </div>
            </Form>
        </div>
    )
}

export default ProductForm