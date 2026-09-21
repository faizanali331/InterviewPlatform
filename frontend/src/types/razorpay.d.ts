interface RazorpayCheckoutOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description?: string;
  handler: (response: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => void;
  modal?: {
    ondismiss?: () => void;
  };
  theme?: { color?: string };
}

interface RazorpayInstance {
  open: () => void;
}

interface Window {
  Razorpay: new (options: RazorpayCheckoutOptions) => RazorpayInstance;
}