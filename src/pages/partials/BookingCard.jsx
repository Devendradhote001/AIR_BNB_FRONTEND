import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { propertyBookingService } from "../../API/bookingService";

const BookingCard = ({ nightRate, totalPrice, property_id }) => {
  const navigate = useNavigate();
  const [guests, setGuests] = useState(1);
  const [checkinDate, setCheckinDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [checkoutDate, setCheckoutDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 2))
      .toISOString()
      .split("T")[0]
  );
  const [nights, setNights] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    const difference = checkout.getTime() - checkin.getTime();
    const totalDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
    setNights(totalDays > 0 ? totalDays : 1);
  }, [checkinDate, checkoutDate]);

  const totalBeforeTaxes = nightRate * nights * guests;


  const handleBooking = async () => {
    setIsLoading(true);
    try {
      const res = await propertyBookingService({
        property_id,
        checkin_date: checkinDate,
        checkout_date: checkoutDate,
        totalPrice,
      });
      
      if (res && res.data && res.data.data) {
        const orderId = res.data.data.razorpayOrderId;
        // Navigate programmatically after getting the orderId
        navigate(`/booking/1?checkinDate=${checkinDate}&checkoutDate=${checkoutDate}&guests=${guests}&order_id=${orderId}&price=${totalPrice}&nights=${nights}`);
      }
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="border p-6 max-w-sm mx-auto shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">
        ₹{nightRate?.toLocaleString()} <span className="text-sm">night</span>
      </h2>

      <div className="border rounded-md mb-4">
        <div className="flex justify-between p-2 border-b">
          <div>
            <p className="text-sm font-semibold">Check-in</p>
            <input
              type="date"
              className="text-gray-500"
              value={checkinDate}
              onChange={(e) => setCheckinDate(e.target.value)}
            />
          </div>
          <div>
            <p className="text-sm font-semibold">Checkout</p>
            <input
              type="date"
              className="text-gray-500"
              value={checkoutDate}
              onChange={(e) => setCheckoutDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleBooking}
        disabled={isLoading}
        className="bg-[#b17f44] text-white font-bold py-2 px-4 w-full rounded-lg mb-4"
      >
        {isLoading ? "Processing..." : "Reserve"}
      </button>
      
      <p className="text-sm text-gray-500 text-center mb-4">
        You won't be charged yet
      </p>

      <div className="text-sm">
        <div className="flex justify-between mb-2">
          <span>
            ₹{nightRate?.toLocaleString()} x {nights} nights x {guests} guests
          </span>
          <span>₹{(nightRate * nights * guests)?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total before taxes</span>
          <span>₹{totalBeforeTaxes?.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
