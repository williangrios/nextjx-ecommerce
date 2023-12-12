import { Table, message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function UsersList() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    
    const getUsers = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/users')
            setUsers(response.data.data)
        } catch (error: any) {
            message.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
      getUsers()
    }, [])
    
    const columns = [
        {
            title: 'Id',
            dataIndex: '_id'
        },
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Is Admin',
            dataIndex: 'isAdmin',
            render: (isAdmin: boolean) => isAdmin ? 'Yes' : 'No'
        },
        {
            title: 'Is Active',
            dataIndex: 'isActive',
            render: (isActive: boolean) => isActive ? 'Yes' : 'No'
        }
    ]

  return (
    <div>
        <Table columns={columns} dataSource={users} rowKey='_id' loading={loading}/>
    </div>
  )
}

export default UsersList