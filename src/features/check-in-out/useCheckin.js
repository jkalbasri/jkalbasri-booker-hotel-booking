import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    // here data is whateve is returned from updateBooking funtion
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully checked in`);
      // invalidate the query which is active
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => {
      toast.error("Unable ot check in booking");
    },
  });
  return { checkin, isCheckingIn };
}

// bookingId will be passed through checkin function to the mutationFn
