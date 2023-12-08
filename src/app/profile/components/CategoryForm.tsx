import { getAntdFieldRequiredRule } from '@/helpers/validations'
import { Form, Modal, message } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'

interface CategoryFormProps{
    showCategoryForm: boolean
    setShowCategoryForm: (show: boolean) => void
    setSelectedCategory: (category: any) => void
    reloadData: () => void
    selectedCategory: any
}

function CategoryForm({showCategoryForm, setShowCategoryForm, setSelectedCategory, reloadData, selectedCategory}: CategoryFormProps) {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const onFinish = async (values: any) => {
        try {
            setLoading(true)
            if (selectedCategory) {
                await axios.put(`/api/categories/${selectedCategory._id}`, values)
                message.error('Category updated successfully')   
            }else{
                await axios.post('/api/categories', values)
                message.error('Category added successfully')   
            }
            setShowCategoryForm(false)         
            setSelectedCategory(null)
            reloadData()
        } catch (error: any) {
            message.error(error.response.data.message || error.message)            
        } finally{
            setLoading(false)
        }
    }
  return (
    <div>
        <Modal open={showCategoryForm} onCancel={() => {
            setShowCategoryForm(false)
            setSelectedCategory(null)
            }} centered title={<h1 className='text-2xl font-bold text-gray-800'>{selectedCategory ? 'Edit category': 'Add Category'}</h1>} closable={false} okText={'Save'} onOk={() => {form.submit()}} okButtonProps={{loading}}>
            <hr/>
            <Form layout='vertical' className='flex flex-col gap-5 mt-5' form={form} onFinish={onFinish} initialValues={selectedCategory}>
                <Form.Item label='Category name' name='name' rules={getAntdFieldRequiredRule('Category name is required')}>
                    <input type='text'/>
                </Form.Item>
                <Form.Item label='Description' name='description' rules={getAntdFieldRequiredRule('Category description is required')}>
                    <textarea/>
                </Form.Item>
            </Form>
        </Modal>
    </div>
  )
}

export default CategoryForm