import { cookies } from 'next/headers'
import axios from "axios"
import Image from 'next/image'
import { Button, Rate } from 'antd'
import AddToCartBtn from '@/components/AddToCartBtn'
import Link from 'next/link'
import Filters from '@/components/Filters'


async function getProducts(searchParams: any) {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')?.value
    const category = searchParams.category || ''
    const search = searchParams.search || ''
    const endpoint = `${process.env.DOMAIN}/api/products?category=${category}&search=${search}`
    const response = await axios.get(endpoint, {
      headers: {
        Cookie: `token=${token}`,
      }
    })
    return response.data.data || []
  } catch (error) {
    return []
  }
}

export default async function Home({searchParams}: {searchParams: any}) {
  const products = await getProducts(searchParams)

  return (
    <main className="">
      <Filters />
      <div className="grid grid-cols-4 gap-5">
        {products.map((product: any) => (
          <div className="p-4 flex flex-col gap-2 border border-solid border-gray-300 " key={product.id}>
            <Link href={`/products/${product._id}`}>
              <div className="text-center">
                <Image src={product.images[0]} alt='' height={180} width={180} />
              </div>
              <span className="text-sm">
                {product.name}
              </span>
            </Link>
            <div className="flex justify-between items-center">
              <Rate disabled defaultValue={product.rating || 0} />
              <div className="flex gap-5 items-center">
                <h1 className="text-lg font-semibold">{product.price}</h1>
                <AddToCartBtn product={product} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
