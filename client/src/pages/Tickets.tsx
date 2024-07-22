import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../app/store";
import { getTickets, reset, Ticket } from "../features/ticket/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import TicketItem from "../components/TicketItem";

const Tickets = () => {
  const { tickets, isLoading, isSuccess, isError, message } = useAppSelector(
    (state: RootState) => state.tickets
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
        </div>
        {tickets.map((ticket: Ticket) => (
          <TicketItem key={ticket._id} {...ticket} />
        ))}
      </div>
    </>
  );
};

export default Tickets;
