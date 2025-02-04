import { Link } from "react-router-dom";
import { Ticket } from "../features/ticket/ticketSlice";

export interface TicketProps extends Ticket {}

const TicketItem = ({ ...ticket }: TicketProps) => {
  return (
    <div className="ticket">
      <div>{new Date(ticket.createdAt).toLocaleString("en-US")}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>

      <Link to={`/tickets/${ticket._id}`} className="btn btn-reverse btn-sm">
        View
      </Link>
    </div>
  );
};

export default TicketItem;
