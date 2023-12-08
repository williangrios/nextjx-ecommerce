'use client'
import { Button, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import CategoryForm from './CategoryForm'
import axios from 'axios'
import moment from 'moment'

function CategoriesList() {
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [loadingForDelete, setLoadingForDelete] = useState(false)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const getCategories = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/categories')
      setCategories(response.data.data)
    } catch (error: any) {
      message.error(error.message)
    } finally {
      setLoading(true)
    }
  }

  const onDelete = async (id: string) => {
    try {
      setLoadingForDelete(true)
      await axios.delete(`/api/categories/${id}`)
      message.success('Category deleted successfully')
      setSelectedCategory(null)
      getCategories()
    } catch (error: any) {
      message.error(error.response.data.message || error.message)      
    } finally{
      setLoadingForDelete(false)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Description',
      dataIndex: 'description'
    },
    {
      title: 'Created by',
      dataIndex: 'createdBy',
      render: (createdBy: any) => createdBy.name
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      render: (createdAt: string) => moment(createdAt).format('DD MMM YYYY hh:mm A')
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (action: any, params: any) => {
        return <div className='flex gap-3 items-center'>
          <Button type='default' className='btn-small' onClick={() => {
            setSelectedCategory(params)
            onDelete(params.id)
            }} loading={loadingForDelete}>Delete</Button>
          <Button type='primary' className='btn-small' onClick={
            () => {
              setShowCategoryForm(true)
              setSelectedCategory(params)
            }
          }>Edit</Button>
        </div>
      }
    }
  ]

  return (
    <div>
      <div className="flex justify-end">
        <Button type='primary' onClick={() => setShowCategoryForm(true)}>
          Add Category
        </Button>
      </div>
      <div className="mt-5">
        <Table columns={columns} dataSource={categories} pagination={false} loading={loading} />
      </div>
      {showCategoryForm && <CategoryForm showCategoryForm={showCategoryForm} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} setShowCategoryForm={setShowCategoryForm} reloadData={() => () => getCategories()} />}
    </div>
  )
}

export default CategoriesList