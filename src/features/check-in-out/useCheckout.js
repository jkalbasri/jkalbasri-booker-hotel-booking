import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    queryKey: ["bookings"],
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-out" }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully checked out`);
      // queryClient.setQueryData(['booking',data.id],data)
      // invalidate the query which is active
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("Error while checking out guest");
    },
  });
  return { checkout, isCheckingOut };
}
