import { createPaymentOrder, confirmPayment } from "../../api/paymentApi";
import { ApiClientError } from "../../api/apiClient";
import { PaymentResponse } from "../../types/payment";
import { useEffect, useRef, useState } from "react";

type Props = {
  bookingId: number;
  onPaid: () => void;
};

export default function PaymentPanel({ bookingId, onPaid }: Props) {
  const [order, setOrder] = useState<PaymentResponse | null>(null);
  const startedForBookingId = useRef<number | null>(null);

  const [status, setStatus] = useState<
    "creating" | "ready" | "confirming" | "failed"
  >("creating");
  const [error, setError] = useState<string | null>(null);

  const startOrder = () => {
    setError(null);
    setStatus("creating");
    createPaymentOrder(bookingId)
      .then((o) => {
        setOrder(o);
        setStatus("ready");
      })
      .catch((err) => {
        setError(
          err instanceof ApiClientError
            ? err.message
            : "Could not start payment.",
        );
        setStatus("failed");
      });
  };

  // useEffect(startOrder, [bookingId]);
  useEffect(() => {
    if (startedForBookingId.current === bookingId) return;
    startedForBookingId.current = bookingId;
    startOrder();
  }, [bookingId]);

  const openCheckout = () => {
    if (!order) return;

    const checkout = new window.Razorpay({
      key: order.razorpayKeyId,
      amount: order.amountInPaise,
      currency: "INR",
      order_id: order.gatewayOrderId,
      name: "InterviewPro",
      description: "Mock interview booking",
      handler: async (response) => {
        setStatus("confirming");
        setError(null);
        try {
          const result = await confirmPayment({
            gatewayOrderId: response.razorpay_order_id,
            gatewayPaymentId: response.razorpay_payment_id,
            gatewaySignature: response.razorpay_signature,
          });
          if (result.status === "SUCCESS") {
            onPaid();
          } else {
            setError("Payment could not be verified. Please try again.");
            setStatus("failed");
          }
        } catch (err) {
          setError(
            err instanceof ApiClientError
              ? err.message
              : "Payment confirmation failed.",
          );
          setStatus("failed");
        }
      },
      modal: {
        ondismiss: () => setStatus("ready"), // user closed the widget without paying
      },
      theme: { color: "#4f46e5" },
    });

    checkout.open();
  };

  return (
    <div className="panel">
      <h3>Complete payment</h3>

      {error && <div className="error">{error}</div>}

      {status === "creating" && <p>Setting up payment...</p>}

      {order && (
        <>
          <div className="line">
            <span>Amount</span>
            <b>₹{order.amount}</b>
          </div>

          <button
            className="primary"
            onClick={openCheckout}
            disabled={status === "confirming"}
          >
            {status === "confirming" ? "Verifying..." : "Pay now"}
          </button>

          {status === "failed" && (
            <button className="text" onClick={startOrder}>
              Try again
            </button>
          )}
        </>
      )}
    </div>
  );
}
