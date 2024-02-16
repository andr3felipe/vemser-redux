import { SerializedError } from "@reduxjs/toolkit";

export interface RegisterUserResponse {
  data: {
    id: number;
    token: string;
  };
}

export interface RegisterUserRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  token: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface CustomResponse extends LoginUserResponse {}

export interface CustomError extends SerializedError {
  error: {
    data: {
      error: string;
    };
    status: number;
  };
}

export function isCustomError(error: any): error is CustomError {
  return "error" in error && typeof error.error === "object";
}

export function isCustomResponse(response: any): response is CustomResponse {
  return "data" in response;
}
