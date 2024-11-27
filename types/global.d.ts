import { Request, Response } from "express";

declare type HttpContext = {
  request: Request;
  response: Response;
};

declare type MiddlewareHandler = (
  request: Request,
  response: Response,
  next: () => void
) => void;
