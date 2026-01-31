import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const userId = localStorage.getItem("userId")

  useEffect(() => {
    fetchCartItems()
  }, [])

  async function fetchCartItems() {
    await axios.get("https://ecommerce-bw89.onrender.com/api/cart",
      { params: { userId } }
    )
      .then((res) => {
        console.log(res)
        if (res.status == 200) {
          setCartItems(res.data.items)
          setLoading(false)
        }
      })
  }

  return (
    <div className='container mt-5'>
      <h2 className='text-center fw-bold mb-4 text-primary'>
        🛒 Your Cart Items
      </h2>

      {
        loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3">Loading your cart...</p>
          </div>
        ) : (
          <div className='row row-cols-1 row-cols-md-3 g-4'>
            {
              cartItems.map((i) => (
                <div className="col" key={i.product._id}>
                  <div className="card h-100 shadow-sm border-0 cart-card">
                    <div className="card-body">
                      <h5 className="card-title fw-bold text-dark">
                        {i.product.name}
                      </h5>

                      <p className="card-text text-success fw-semibold fs-5">
                        ₹ {i.product.price}
                      </p>

                      <p className="card-text">
                        <b>Category:</b> {i.product.category}
                      </p>

                      <p className="card-text text-muted small">
                        {i.product.description}
                      </p>

                      <p className="card-text">
                        <b>Stock:</b> {i.product.stock}
                      </p>

                      <span className="badge bg-primary fs-6">
                        Quantity: {i.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}
