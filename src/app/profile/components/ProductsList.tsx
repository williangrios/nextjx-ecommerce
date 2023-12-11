'use client'
import { Button, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import CategoryForm from './CategoryForm'
import axios from 'axios'
import moment from 'moment'
import { useRouter } from 'next/navigation'


function ProductsList() {
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const router = useRouter()
    const getProducts = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/products')
            setProducts(response.data.data)
        } catch (error: any) {
            message.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
      getProducts()
    }, [])

    const deleteProduct = async (productId: string) => {
        try {
            setDeleteLoading(true)
            await axios.delete(`/api/products/${productId}`)
            message.success('Product deleted')
            getProducts()
        } catch (error: any) {
            message.error(error.message)            
        } finally {
            setDeleteLoading(false)
        }

    }
    
    const columns = [
        {
            title: 'Product',
            dataIndex: 'name',
            render: (text: string, record: any) => 
                <img src={record.images[0]} alt={text} className='w-20 h-20 object-cover rounded-full'/>
        },
        {
            title: 'Name',
            dataIndex: 'name'
        }, 
        {
            title: 'Created by',
            dataIndex: 'createdBy',
            render: (createdBy: any) => createdBy.name,
        },
        {
            title: 'Created at',
            dataIndex: 'createdAt',
            render: (createdAt: any) => moment(createdAt).format('DD MM YYYY hh:mm A'),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (action: any, params: any) => {
              return <div className='flex gap-3 items-center'>
                <Button type='default' className='btn-small' onClick={() => {
                    setSelectedProduct(params)
                    deleteProduct(params._id)
                    }} loading={deleteLoading && selectedProduct?._id === params._id}>Delete</Button>
                <Button type='primary' className='btn-small' onClick={
                  () => {
                    router.push(`/profile/edit_product/${params._id}`)
                  }
                }>Edit</Button>
              </div>
            }
          }
    ]

    return (
        <div>
            <div className="flex justify-center">
                <Button type='primary' onClick={() => router.push('/profile/add_product')}>
                    Add Product
                </Button>
            </div>
            <div className="mt-5">
                <Table columns={columns} dataSource={products} loading={loading} pagination={false}/>
            </div>
        </div>
    )
}

export default ProductsList