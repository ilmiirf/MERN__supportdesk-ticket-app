import axios from "axios";
import { TicketProps } from "./ticketSlice";

const API_URL = "/api/tickets";

// Create new ticket
const createTicket = async (ticketData: TicketProps, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    "http://localhost:5000/api/tickets",
    ticketData,
    config
  );
  return response.data;
};

const getTickets = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("http://localhost:5000/api/tickets", config);
  return response.data;
};

const getTicket = async (ticketId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    "http://localhost:5000/api/tickets/" + ticketId,
    config
  );
  return response.data;
};

const closeTicket = async (ticketId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    "http://localhost:5000/api/tickets/" + ticketId,
    { status: "closed" },
    config
  );
  return response.data;
};

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket,
};

export default ticketService;
