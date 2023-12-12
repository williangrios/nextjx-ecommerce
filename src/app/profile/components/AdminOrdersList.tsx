import Loader from '@/components/Loader'
import { Table, message } from 'antd'
import axios from 'axios'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function AdminOrdersList() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false)
  const router = useRouter()

  const getOrders = async () => {
    try {
      setLoading(true)
      const endpoint = `/api/orders`
      const response = await axios.get(endpoint)
      setOrders(response.data)
    } catch (error: any) {
      message.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const onStatusUpdate = async (orderId: string, status: string) => {
    try {
      setStatusUpdateLoading(true)
      const endpoint = `/api/orders/${orderId}`
      await axios.put(endpoint, { orderStatus: status })
      message.success('Order updated successfully')
      getOrders()
    } catch (error: any) {
      message.error(error.message)
    } finally {
      setStatusUpdateLoading(false)
    }
  }

  const onRefundIssue = async (orderId: string, transactionId: string) => {
    try {
      setStatusUpdateLoading(true)
      const endpoint = `/api/stripe_refund`
      await axios.post(endpoint, { orderId, transactionId })
      message.success('Refund issued successfully')
      getOrders()
    } catch (error: any) {
      message.error(error.response.data.message)
    } finally {
      setStatusUpdateLoading(false)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  const columns = [
    {
      title: 'Order Id',
      dataIndex: '_id'
    },
    {
      title: 'User',
      dataIndex: 'user',
      render: (user: any) => user.name
    },
    {
      title: 'Placed On',
      dataIndex: 'createdAt',
      render: (date: string) => moment(date).format('DD MMM YYYY hh:mm a')
    },
    {
      title: 'Total',
      dataIndex: 'total'
    },
    {
      title: 'Status',
      dataIndex: 'orderStatus',
      render: (status: string, record: any) => (
        <div className="">
          <select value={status} onChange={(e) => {
            onStatusUpdate(record._id, e.target.value)
          }}>
            <option value='order placed'>Order Placed</option>
            <option value='shipped'>Order Shipped</option>
            <option value='out for delivery'>Out for delivery</option>
            <option value='delivered'>Delivered</option>
            <option value='cancelled'>Cancelled</option>
          </select>
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'paymentStatus',
      render: (status: string) => status.toUpperCase()
    },
    {
      title: 'Action',
      render: (record: any) => (
        <div className="flex gap-5">
          {record.orderStatus === 'cancelled' && record.paymentStatus === 'paid' &&
            <span className='underline cursor-pointer' onClick={() => {
              onRefundIssue(record._id, record.transactionId)
            }}
            >Issue refunded</span>
          }
          <span className='underline cursor-pointer' onClick={() => router.push(`/profile/orders/${record._id}`)}>View</span>
        </div>
      )
    }
  ]

  return (
    <div>
      {statusUpdateLoading && <Loader />}
      <Table columns={columns} dataSource={orders} rowKey='_id' loading={loading} pagination={false} />
    </div>
  )
}

export default AdminOrdersList