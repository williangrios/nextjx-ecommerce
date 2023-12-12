import loading from '@/app/loading'
import { getAntdFieldRequiredRule } from '@/helpers/validations'
import { SetCurrentUser } from '@/redux/userSlice'
import { Form, Button, message } from 'antd'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function PersonalInfo() {
    const [loading, setLoading] = useState(false)
    const { currentUser} = useSelector((state: any) => state.user)
    const dispatch = useDispatch()
    const onSave = async (values: any) => {
        try {
            setLoading(true)
            const endpoint =`/api/users/${currentUser._id}` 
            const response = await axios.put( endpoint, values)
            dispatch(SetCurrentUser(response.data))
            message.success('User updated successfully')
        } catch (error: any) {
            message.error(error.response.data.message)
        } finally{
            setLoading(false)

        }
    }
    return (
        <div>
            <Form className='w-[400px] flex flex-col gap-4' layout='vertical' onFinish={onSave}>
                <Form.Item name='name' label='Name' rules={getAntdFieldRequiredRule("Please, input your name")}><input type="text" /></Form.Item>
                <Form.Item name='email' label='Email' rules={getAntdFieldRequiredRule("Please, input your e-mail")}><input type="email" disabled/></Form.Item>
                <Form.Item name='password' label='Password' rules={getAntdFieldRequiredRule("Please, input your old password")}><input type="password" /></Form.Item>
                <Form.Item name='newpassword' label='New Password' rules={getAntdFieldRequiredRule("Please, input your new password")}><input type="password" /></Form.Item>
                <Button block type='primary' htmlType='submit' loading={loading}>Save</Button>
            </Form>
        </div>
    )
}

export default PersonalInfo