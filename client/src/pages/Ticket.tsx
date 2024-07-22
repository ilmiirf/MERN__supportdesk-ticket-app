import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../app/store";
import { getTicket, reset, closeTicket } from "../features/ticket/ticketSlice";
import BackButton from "../components/BackButton";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const Ticket = () => {
  const { ticket, isLoading, isSuccess, isError, message } = useAppSelector(
    (state: RootState) => state.tickets
  );
  const { ticketId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId!));
  }, [isError, message, ticketId]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId!));
    toast.success("Ticket Closed");
    navigate("/tickets");
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>something went wrong</h3>;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID : {ticket?._id}
          <span className={`status status-${ticket?.status}`}>
            {ticket?.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}
        </h3>
        <h3>Product: {ticket?.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issues</h3>
          <p>{ticket?.description}</p>
        </div>
      </header>
      {ticket?.status !== "closed" && (
        <button
          onClick={() => {
            dispatch(closeTicket(ticketId!));
            toast.success("Ticket Closed");
            navigate("/tickets");
          }}
          className="btn btn-block btn-danger"
        >
          Close Ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
