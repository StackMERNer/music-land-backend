
import { Response } from "express";
// Helper function to send a successful response
export function sendSuccess(res: Response, payload: any) {
  res.status(200).json({
    success: true,
    payload: payload,
  });
}

// Helper function to send an error response
export function sendError(res: Response, statusCode: number, message: string) {
  res.status(statusCode).json({
    success: false,
    error: {
      message: message,
    },
  });
}

