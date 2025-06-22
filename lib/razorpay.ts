import Razorpay from "razorpay"

// Server-side Razorpay instance
export const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

// Client-side Razorpay default configuration
export const razorpayConfig = {
  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  currency: "INR",
  name: "CutieTube",
  description: "Video Platform Subscription",
  image: "/logo.png",
  theme: {
    color: "#3B82F6",
  },
}

// Utility function to format currency to INR
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount / 100) // Razorpay amounts are in paise
}

// Validate Razorpay payment signature (server-side)
export const validatePaymentSignature = (
  orderId: string,
  paymentId: string,
  signature: string
): boolean => {
  const crypto = require("crypto")
  const body = orderId + "|" + paymentId
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body.toString())
    .digest("hex")

  return expectedSignature === signature
}

// ✅ Dynamic Razorpay payment options for the frontend
export const getRazorpayOptions = (orderId: string, amount: number) => {
  return {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    amount: amount * 100, // in paise
    currency: "INR",
    name: "CutieTube",
    description: "Video Platform Subscription",
    image: "/logo.png",
    order_id: orderId,
    theme: {
      color: "#3B82F6",
    },
  }
}
