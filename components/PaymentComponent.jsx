import React, { useState, useEffect } from "react";
import axios from "axios";

const PaymentComponent = () => {
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);

  // Dynamically load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const orderResponse = await axios.post(
        "http://localhost:8080/api/payment/create-order",
        { amount: amount * 100 } // convert to paise
      );

      const { orderId, currency, keyId } = orderResponse.data;

      const options = {
        key: keyId,
        amount: amount * 100,
        currency: currency,
        name: "My App",
        description: "Test Payment",
        order_id: orderId,
        handler: async function (response) {
          try {
            const verifyResponse = await axios.post(
              "http://localhost:8080/api/payment/verify",
              {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }
            );
            alert("Payment Success: " + verifyResponse.data);
          } catch (err) {
            alert("Payment Verification Failed");
            console.error(err);
          }
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Order creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Pay with Razorpay</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount in INR"
        style={{ padding: "10px", fontSize: "16px", width: "100%", marginBottom: "20px" }}
      />
      <button
        onClick={handlePayment}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#3399cc",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Processing..." : `Pay ₹${amount}`}
      </button>
    </div>
  );
};

export default PaymentComponent;
