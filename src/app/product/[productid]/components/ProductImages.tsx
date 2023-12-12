'use client'
import Image from 'next/image'
import React, { useState } from 'react'

function ProductImages({product}: {product: any}) {
    const [selectedImage ='', setSelectedImage] = useState(product.images[0])
    return (
        <div className='flex gap-5'>
            <div className='flex flex-col gap-5'>
                {product.images.map((image: any) => (
                    <div className="div" key={image} onClick={() => setSelectedImage(image)}>
                        <Image src={image} alt='' height={50} width={50} className={`cursor-pointer object-cover border border-solid p-2 border-gray-300 ${selectedImage === image && 'border-blue-500 border-2'}`} />
                    </div>
                ))}
            </div>
            <Image src={selectedImage} alt='' height={400} width={400} />
        </div>
    )
}

export default ProductImages