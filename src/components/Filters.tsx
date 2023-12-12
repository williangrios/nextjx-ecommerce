'use client'
import { message } from 'antd'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Filters() {
    const [search, setSearch] = useState('')
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const router = useRouter()
    const searchParams = useSearchParams()

    const getCategories = async () => {
        try {
            const response = await axios.get('/api/categories')
            const tempCategories: any = [{
                name: 'All',
                _id: ''
            }]
            tempCategories.push(...response.data.data)
            setCategories(tempCategories)
        } catch (error: any) {
            message.error(error.message)
        } finally {
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    const onSelectCategory = (category: any) => {
        setSelectedCategory(category._id)
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.set('category', category._id)
        router.push(`/?${newSearchParams.toString()}`)
    }

    useEffect(() => {
      const timer = setTimeout(() => {
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.set('search', search)
        router.push(`/?${newSearchParams.toString()}`)
      }, 500)
    }, [search])
    

    return (
        <div className='flex flex-col gap-5'>
            <div className="flex gap-10 bg-gray-300 py-2 px-5">
                {categories.map((category: any) => <div className={`cursor-pointer ${selectedCategory === category._id ? 'text-black font-semibold' : 'text-gray-500'}`} key={category._id} onClick={() => {
                    onSelectCategory(category)
                }}>
                    <span >{category.name}</span>
                </div>)}
            </div>
            <input type='text' placeholder='Search products' value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
    )
}

export default Filters