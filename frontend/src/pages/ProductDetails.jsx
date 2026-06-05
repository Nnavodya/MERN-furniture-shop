import React from 'react'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {
  const { id } = useParams()
  return (
    <div className="container mx-auto p-8 text-white">
      <h2 className="text-3xl font-bold">Product {id}</h2>
      <p>Product details placeholder.</p>
    </div>
  )
}

export default ProductDetails
