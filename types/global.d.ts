import { Request, Response } from "express";
import AuthContract from "framework/AuthContract";

declare type HttpContext = {
  request: Request;
  response: Response;
  auth: AuthContract;
};

declare type MiddlewareHandler = (
  request: Request,
  response: Response,
  next: () => void
) => void;
