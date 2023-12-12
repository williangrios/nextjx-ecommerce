'use client'
import { Modal, message } from 'antd'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import Loader from '@/components/Loader'

interface CheckoutModalProps {
  showCheckoutModal: boolean
  setShowCheckoutModal: any
  total: number
}

const stripePromise = loadStripe('pk____')

function CheckoutModal({ showCheckoutModal, setShowCheckoutModal, total }: CheckoutModalProps) {
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(false)
  const loadClientSecret = async () => {
    try {
      setLoading(true)
      const res = await axios.post('/api/stripe_client_secret', { amount: total })
      setClientSecret(res.data.clientSecret)
    } catch (error: any) {
      message.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadClientSecret()
  }, [])

  return <Modal
    title={
      <div className='flex justify-between items-center font-bold text-xl'>
        <span>Checkout</span>
        <span>Total: ${total}</span>
      </div>
    }
    open={showCheckoutModal}
    onCancel={() => setShowCheckoutModal(false)}
    centered
    closable={false}
    footer={false}
  >
    {loading && <Loader />}
    <hr className='my-5' />
    <div className="mt-5">
      {stripePromise &&
        <Elements stripe={stripePromise} options={{
          clientSecret: clientSecret
        }}>
          <CheckoutForm total={total} setShowCheckoutModal={setShowCheckoutModal}/>
        </Elements>
      }
    </div>
  </Modal>
}

export default CheckoutModal