'use client'
import { getAntdFieldRequiredRule } from '@/helpers/validations'
import { Button, Form, message } from 'antd'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface userType {
  name: string
  email: string
  password: string
}

export default function Register() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const onRegister = async (values: userType) => {
    try {
      setLoading(true)
      await axios.post('/api/auth/register', values)
      message.success('Registration successfull, please login to continue')
      router.push('/auth/login')
    } catch (error: any) {
      message.error(error.response.data.message)
    } finally {
      setLoading(false)
    }

  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 min-h-screen'>
      <div className="h-full bg-primary flex items-center justify-center space-x-6">
        <h1 className='text-2xl md:text-6xl font-bold text-red-500'>Ecommerce</h1>
        <h1 className='text-2xl md:text-6xl font-bold text-yellow-500'>Next.js</h1>
      </div>
      <div className="h-full flex items-center justify-center space-x-6 px-4">
        <Form className='w-[400px] flex flex-col gap-4' layout='vertical' onFinish={onRegister}>
          <h1 className='text-2xl font-bold'>Register</h1>
          <hr />
          <Form.Item name='name' label='Name' rules={getAntdFieldRequiredRule("Please, input your name")}><input type="text" /></Form.Item>
          <Form.Item name='email' label='Email' rules={getAntdFieldRequiredRule("Please, input your e-mail")}><input type="email" /></Form.Item>
          <Form.Item name='password' label='Password' rules={getAntdFieldRequiredRule("Please, input your password")}><input type="password" /></Form.Item>
          <Button block type='primary' htmlType='submit' loading={loading}>Register</Button>
          <Link className='text-primary' href='/auth/login'>Already have an account? Login</Link>
        </Form>
      </div>
    </div>
  )
}
