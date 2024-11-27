import { Request, Response } from "express";

declare type HttpContext = {
    request: Request;
    response: Response;
  };
  