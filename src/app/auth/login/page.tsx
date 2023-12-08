'use client'
import { getAntdFieldRequiredRule } from '@/helpers/validations'
import { Button, Form, message } from 'antd'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface userType {
  email: string
  password: string
}

export default function Login() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onLogin = async (values: userType) => {
    try {
      setLoading(true)
      await axios.post('/api/auth/login', values)
      message.success('Login Successful')
      // router.push('/')
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
        <Form className='w-[400px] flex flex-col gap-4' layout='vertical' onFinish={onLogin}>
          <h1 className='text-2xl font-bold'>Login</h1>
          <hr />
          <Form.Item name='email' label='Email' rules={getAntdFieldRequiredRule("Please, input your email")}><input type="email" /></Form.Item>
          <Form.Item name='password' label='Password' rules={getAntdFieldRequiredRule("Please, input your password")}><input type="password" /></Form.Item>
          <Button block type='primary' htmlType='submit' loading={loading}>Login</Button>
          <Link className='text-primary' href='/auth/register'>Dont have an account? Register</Link>
        </Form>
      </div>
    </div>
  )
}
