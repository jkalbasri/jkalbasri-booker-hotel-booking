import React from "react";
import BookingDetail from "../features/bookings/BookingDetail";

function Booking() {
  // simply render a component from features folder cuz we want to keep our PAGES pure(no data fetching)
  return <BookingDetail />;
}

export default Booking;
