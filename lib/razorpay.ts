import Razorpay from "razorpay"

// Server-side Razorpay instance
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

// Client-side Razorpay options
export const getRazorpayOptions = (
  orderId: string,
  amount: number,
  currency = "INR",
  name: string,
  description: string,
  userEmail: string,
  userName: string,
  onSuccess: (response: any) => void,
  onFailure: (error: any) => void,
) => ({
  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  amount: amount * 100, // Razorpay expects amount in paise
  currency,
  name: "CutieTube",
  description,
  order_id: orderId,
  handler: onSuccess,
  prefill: {
    name: userName,
    email: userEmail,
  },
  theme: {
    color: "#3B82F6",
  },
  modal: {
    ondismiss: onFailure,
  },
})

// Payment verification
export const verifyPaymentSignature = (orderId: string, paymentId: string, signature: string): boolean => {
  const crypto = require("crypto")
  const body = orderId + "|" + paymentId
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body.toString())
    .digest("hex")

  return expectedSignature === signature
}
