import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyPaymentService } from "../API/paymentService";

const BookingPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [paymentDetails, setPaymentDetails] = useState({
    razorpay_order_id: "",
    razorpay_payment_id: "",
    razorpay_signature: "",
  });

  const verifyPayment = async (paymentData) => {
    try {
      const res = await verifyPaymentService(paymentData);
      if (res) {
        alert("Payment verified successfully");
      }
      console.log("res after success ->", res);
      navigate("/");
      return res;
    } catch (error) {
      console.error("Payment verification failed:", error);
      alert("Payment verification failed");
    }
  };

  // useEffect(() => {
  //   // Only call verifyPayment if we have all the required payment details with non-empty values
  //   if (
  //     paymentDetails &&
  //     paymentDetails.razorpay_order_id &&
  //     paymentDetails.razorpay_order_id.trim() !== "" &&
  //     paymentDetails.razorpay_payment_id &&
  //     paymentDetails.razorpay_payment_id.trim() !== "" &&
  //     paymentDetails.razorpay_signature &&
  //     paymentDetails.razorpay_signature.trim() !== ""
  //   ) {
  //     verifyPayment(paymentDetails);
  //   }
  // }, [paymentDetails]);

  // Process URL parameters
  const data = decodeURIComponent(search)
    .split("?")[1]
    .split("&")
    .reduce((acc, item) => {
      const [key, value] = item.split("=");
      // Remove surrounding quotes from value if present
      acc[key] = value.replace(/^"|"$/g, "");
      return acc;
    }, {});

  // Initialize payment process with order ID from URL

  const handlePayment = async () => {
    const order_id = data?.order_id; // Replace with real test order_id

    const options = {
      key: "rzp_test_TD7hsHlT24JGFc", // Use Test Key ID from Razorpay Dashboard
      amount: data?.price, // in paise (50000 = ₹500)
      currency: "INR",
      name: "Test Corp",
      description: "Test Transaction",
      // image: "https://your-logo-url.com/logo.png", // Optional
      order_id: order_id, // Generated from backend
      handler: function (response) {
        alert(`Payment successful!
  Payment ID: ${response.razorpay_payment_id}
  Order ID: ${response.razorpay_order_id}
  Signature: ${response.razorpay_signature}`);

        const paymentData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };

        // Directly call verifyPayment with the payment details
        verifyPayment(paymentData);

        // Also update state for the useEffect dependency
        setPaymentDetails(paymentData);
      },
      prefill: {
        name: "Devendra",
        email: "dev@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
      method: {
        upi: true,
        card: false,
        netbanking: false,
        wallet: false,
      },
    };

    const rzp = new window.Razorpay(options);
    // Open Razorpay payment dialog
    rzp.open();
  };

  return (
    <div className="h-screen w-full bg-zinc-50 px-40 flex flex-col justify-center items-center">
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="col-span-2">
          <h1 className="text-2xl font-bold mb-6">Request to book</h1>

          {/* Trip Details */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-5">Your trip</h2>
            <div className="flex gap-20 items-center">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-semibold text-black">Dates</p>
                  <p className="text-lg font-medium">
                    {new Date(data.checkinDate).getDate() +
                      " " +
                      new Date(data.checkinDate).toLocaleString("default", {
                        month: "short",
                      }) +
                      " " +
                      new Date(data.checkinDate).getFullYear()}{" "}
                    –{" "}
                    {new Date(data.checkoutDate).getDate() +
                      " " +
                      new Date(data.checkoutDate).toLocaleString("default", {
                        month: "short",
                      }) +
                      " " +
                      new Date(data.checkoutDate).getFullYear()}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center text-center">
                <div>
                  <p className="text-xl font-semibold text-black">Guests</p>
                  <p className="text-lg font-medium">{data.guests}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="bg-[#b17f44] text-white font-bold py-2 px-10 rounded-lg mt-8"
            >
              Book Now
            </button>
          </section>
        </div>

        {/* Right Section */}
        <div>
          <div className="border rounded-lg p-4">
            {/* Hotel Info */}
            <div className="flex gap-4 mb-6">
              <img
                src="https://via.placeholder.com/80" // Replace with actual image
                alt="Hotel"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium">
                  Royal Boutique Hotel - VILA DOMINA
                </p>
                <p className="text-sm text-gray-600">Room in boutique hotel</p>
              </div>
            </div>

            {/* Price Details */}
            <h2 className="text-lg font-semibold mb-4">Price details</h2>
            <div className="flex justify-between text-sm mb-2">
              <p>
                ₹{data.price} x {data.nights} nights X {data.guests} guests
              </p>
              <p>₹{data.price * data.nights * data.guests}</p>
            </div>
            <div className="flex justify-between font-semibold text-md mt-4 border-t pt-4">
              <p>Total (INR)</p>
              <p>₹{data.price * data.nights * data.guests}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
