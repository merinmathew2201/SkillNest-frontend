import React from 'react'

import { Link } from 'react-router-dom'

function PaymentError() {
  return (
    <>
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-100">
      <h1 className="text-3xl font-bold text-red-700 mb-4">
        Payment Failed
      </h1>
      <p className="text-lg text-red-800 mb-4">
        Oops! Something went wrong with your payment. Please try again.
      </p>
      <button
        className="px-6 py-3 bg-red-700 text-white rounded hover:bg-red-800">
        <Link to={'/courses'}>Retry Payment</Link>
      </button>
    </div>
    </>
  )
}

export default PaymentError