export interface JwtPayload {
  userId: string;
}

// Ensure the Request interface in Express is extended to include the user payload
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
