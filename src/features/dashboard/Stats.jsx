import React from "react";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinsCount }) {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const checkins = confirmedStays.length;

  // num of checked in nights / all available nights
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinsCount);

  return (
    <>
      <Stat
        value={numBookings}
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        color="blue"
      />

      <Stat
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
        title="Sales"
        color="green"
      />

      <Stat
        value={checkins}
        icon={<HiOutlineCalendarDays />}
        title="Check ins"
        color="indigo"
      />

      <Stat
        value={Math.round(occupation * 100) + "%"}
        icon={<HiOutlineChartBar />}
        title="Occupancy rate"
        color="yellow"
      />
    </>
  );
}

export default Stats;
