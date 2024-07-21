import { Request, Response } from "express";
import { RequestWithUser } from "../types/user";

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// @desc Get user tickets
// @route GET /api/tickets
// @access Private
export const getTickets = asyncHandler(
  async (req: RequestWithUser, res: Response) => {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const tickets = await Ticket.find({ user: req.user.id });

    res.status(200).json(tickets);
  }
);

// @desc Get user ticket
// @route GET /api/tickets/:id
// @access Private
export const getTicket = asyncHandler(
  async (req: RequestWithUser, res: Response) => {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      res.status(404);
      throw new Error("Ticket not found");
    }

    if (ticket.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("Not authorized");
    }

    res.status(200).json(ticket);
  }
);

// @desc Create new ticket
// @route POST /api/tickets
// @access Private
export const createTicket = asyncHandler(
  async (req: RequestWithUser, res: Response) => {
    const { product, description } = req.body;
    if (!product || !description) {
      res.status(400);
      throw new Error("Please add a product and description");
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const ticket = await Ticket.create({
      product,
      description,
      user: req.user.id,
      status: "new",
    });

    res.status(201).json(ticket);
  }
);

// @desc Update user ticket
// @route UPDATE /api/tickets/:id
// @access Private
export const updateTicket = asyncHandler(
  async (req: RequestWithUser, res: Response) => {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      res.status(404);
      throw new Error("Ticket not found");
    }

    if (ticket.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedTicket);
  }
);

// @desc Delete user ticket
// @route DELETE /api/tickets/:id
// @access Private
export const deleteTicket = asyncHandler(
  async (req: RequestWithUser, res: Response) => {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      res.status(404);
      throw new Error("Ticket not found");
    }

    if (ticket.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("Not authorized");
    }

    await Ticket.deleteOne({ _id: req.params.id });

    res.status(200).json({ success: true });
  }
);
