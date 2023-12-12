import { Modal, Table, message } from 'antd'
import axios from 'axios'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function UsersOrdersList() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [showCancelModal, setShowCancelModal] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [statusUpdaetLoading, setStatusUpdateLoading] = useState(false)
    const router = useRouter()
    const { currentUser } = useSelector((state: any) => state.user)

    const getOrders = async () => {
        try {
            setLoading(true)
            const endpoint = `/api/orders?user=${currentUser._id}`
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
            message.success('Order cancelled')
            setShowCancelModal(false)
            getOrders()
        } catch (error: any) {
            message.error(error.message)
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
        },
        {
            title: 'Action',
            render: (record: any) => (
                <div className="flex gap-5">
                    {record.orderStatus === 'order placed' &&
                        <span className='underline cursor-pointer' onClick={() => {
                            setSelectedOrder(record)
                            setShowCancelModal(true)
                        }}>Cancel </span>
                    }
                    <span className='underline cursor-pointer' onClick={() => router.push(`/profile/orders/${record._id}`)}>View </span>
                </div>
            )
        }
    ]

    return (
        <div>
            <Table columns={columns} dataSource={orders} rowKey='_id' loading={loading} pagination={false} />
            {selectedOrder &&
                <Modal centered title='Cancel order' closable={false} open={showCancelModal} onCancel={() => {
                    setShowCancelModal(false)
                }} onOk={() => {
                    onStatusUpdate(selectedOrder._id, 'cancelled')
                    setShowCancelModal(false)
                }} okText='Yes, cancel order' cancelText='No, keep order' okButtonProps={{
                    loading: statusUpdaetLoading
                }}><p className='my-10 text-gray-600'>Are you sure?</p></Modal>
            }
        </div>
    )
}

export default UsersOrdersList